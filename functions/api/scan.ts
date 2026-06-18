/**
 * Scan API — Cloudflare Pages Function
 * Accepts ?domain=example.com, returns structured security posture report.
 */
const DNS_API = 'https://cloudflare-dns.com/dns-query';

async function queryDNS(domain, type) {
  const url = `${DNS_API}?name=${domain}&type=${type}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/dns-json' },
  });
  if (!res.ok) return { records: [], error: null };
  const data = await res.json();
  return { records: data.Answer || [], error: data.Status !== 0 ? data.Comment : null };
}

function dmarcPolicy(record) {
  const parts = record.split(';').map(p => p.trim());
  const tag = parts.find(p => p.startsWith('p='));
  if (!tag) return 'none';
  return tag.substring(2).toUpperCase();
}

function check(id, label, passed, severity, emoji, detail, remediation, context, category) {
  return { id, label, passed, severity, emoji, detail, remediation, context, category };
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const domain = url.searchParams.get('domain') || '';

  if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
    return Response.json({ error: 'Invalid domain' }, { status: 400 });
  }

  const cleanDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
  const checks = [];
  let passed = 0;

  // --- Category: 🔒 TLS & HTTPS ---
  try {
    const httpsUrl = `https://${cleanDomain}/`;
    const resp = await fetch(httpsUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    const headers = {};
    for (const [key, val] of resp.headers) {
      if (['strict-transport-security', 'content-security-policy',
           'x-frame-options', 'x-content-type-options'].includes(key)) {
        headers[key] = val;
      }
    }
    const finalUrl = new URL(resp.url);
    const redirectOK = finalUrl.hostname === cleanDomain;
    const hsts = headers['strict-transport-security'] || '';
    const hstsPassed = !!hsts;
    const cspPassed = !!headers['content-security-policy'];
    const xfoPassed = !!headers['x-frame-options'];
    const xctoPassed = !!headers['x-content-type-options'];

    checks.push(check(
      'https-reachable', 'HTTPS Accessible', resp.status === 200,
      'critical', resp.status === 200 ? '✅' : '❌',
      resp.status === 200 ? `HTTP ${resp.status} OK` : `HTTP ${resp.status}`,
      resp.status === 200 ? null : 'Ensure your server listens on port 443 with a valid TLS certificate.',
      'The scan attempts an HTTPS connection. A non-200 response means your site may be inaccessible or returning errors over HTTPS.',
      '🔒 TLS & HTTPS',
    ));

    checks.push(check(
      'hsts', 'HTTP Strict Transport Security (HSTS)', hstsPassed,
      'high', hstsPassed ? '✅' : '❌',
      hstsPassed ? `Set: ${hsts.substring(0, 50)}...` : 'Not configured',
      'Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      'HSTS tells browsers to always connect via HTTPS. Without it, users can be downgraded to HTTP via SSL stripping attacks.',
      '🔒 TLS & HTTPS',
    ));
    if (hstsPassed) passed++;

    checks.push(check(
      'csp', 'Content Security Policy (CSP)', cspPassed,
      'high', cspPassed ? '✅' : '❌',
      cspPassed ? 'CSP policy is set' : 'Not configured',
      'Add header: Content-Security-Policy: default-src \'self\'; script-src \'self\'; object-src \'none\'',
      'CSP prevents XSS attacks by controlling which resources can load. Missing CSP means any XSS vulnerability is fully exploitable.',
      '🔒 TLS & HTTPS',
    ));
    if (cspPassed) passed++;

    checks.push(check(
      'xfo', 'X-Frame-Options', xfoPassed,
      'medium', xfoPassed ? '✅' : '❌',
      xfoPassed ? `Set to: ${headers['x-frame-options']}` : 'Not configured',
      'Add header: X-Frame-Options: DENY (or SAMEORIGIN if framing needed)',
      'X-Frame-Options prevents clickjacking by blocking your site from being embedded in iframes on other domains.',
      '🔒 TLS & HTTPS',
    ));
    if (xfoPassed) passed++;

    checks.push(check(
      'xcto', 'X-Content-Type-Options', xctoPassed,
      'medium', xctoPassed ? '✅' : '❌',
      xctoPassed ? `Set to: ${headers['x-content-type-options']}` : 'Not configured',
      'Add header: X-Content-Type-Options: nosniff',
      'Prevents MIME-type sniffing, which browsers use to guess content types. Disabling reduces drive-by download risks.',
      '🔒 TLS & HTTPS',
    ));
    if (xctoPassed) passed++;

    checks.push(check(
      'same-domain', 'No Cross-Domain Redirect', redirectOK,
      'medium', redirectOK ? '✅' : '⚠️',
      redirectOK ? `Stays on ${cleanDomain}` : `Redirects to ${finalUrl.hostname}`,
      redirectOK ? null : 'Ensure your canonical domain serves content without redirecting to a different domain.',
      'Cross-domain redirects can confuse users and dilute SEO. Enterprise security scanners flag this as a trust concern.',
      '🔒 TLS & HTTPS',
    ));
    if (redirectOK) passed++;
  } catch (e) {
    checks.push(check(
      'https-reachable', 'HTTPS Accessible', false,
      'critical', '❌', e.message,
      'Verify your TLS certificate is valid and your server responds on port 443.',
      'The scan could not establish an HTTPS connection, which blocks all other TLS/HTTPS checks.',
      '🔒 TLS & HTTPS',
    ));
  }

  // --- Category: 🔄 HTTP → HTTPS Redirect ---
  try {
    const httpUrl = `http://${cleanDomain}/`;
    const resp = await fetch(httpUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    });
    const redirects = resp.status >= 300 && resp.status < 400;
    const location = resp.headers.get('location') || '';
    const toHttps = location.startsWith('https://');

    checks.push(check(
      'http-redirect', 'HTTP → HTTPS Redirect', redirects && toHttps,
      'critical', redirects && toHttps ? '✅' : '❌',
      redirects && toHttps ? `Redirects to HTTPS (${resp.status})` :
        redirects ? `Redirects to HTTP — not HTTPS` :
        `No redirect (HTTP ${resp.status})`,
      'Configure your server to 301 redirect all HTTP traffic to the HTTPS version.',
      'Without an HTTP→HTTPS redirect, users visiting http:// URLs stay on unencrypted HTTP, vulnerable to interception.',
      '🔄 HTTP → HTTPS',
    ));
    if (redirects && toHttps) passed++;
  } catch (e) {
    checks.push(check(
      'http-redirect', 'HTTP → HTTPS Redirect', false,
      'critical', '❌', e.message,
      'Ensure your server responds on port 80 with a 301/302 redirect to HTTPS.',
      'The scan could not reach the HTTP endpoint, which may indicate a network issue or missing A/AAAA record.',
      '🔄 HTTP → HTTPS',
    ));
  }

  // --- Category: 📧 Email Security ---
  const { records: txtRecords } = await queryDNS(cleanDomain, 'TXT');

  const spf = txtRecords.map(r => r.data).find(d => d.startsWith('v=spf1'));
  checks.push(check(
    'spf', 'SPF Record', !!spf,
    'high', spf ? '✅' : '❌',
    spf ? spf.substring(0, 60) + (spf.length > 60 ? '...' : '') : 'Not configured',
    'Add a TXT record: v=spf1 mx include:_spf.google.com ~all (customize for your mail provider)',
    'SPF specifies which servers can send email from your domain. Without it, attackers can spoof your domain in phishing emails.',
    '📧 Email Security',
  ));
  if (spf) passed++;

  const selectors = ['default', 'google', 'selector1', 'selector2', 'dkim', 'mail', 's1', 's2'];
  let dkimFound = null;
  for (const sel of selectors) {
    const { records } = await queryDNS(`${sel}._domainkey.${cleanDomain}`, 'TXT');
    if (records.length) { dkimFound = `${sel}._domainkey.${cleanDomain}`; break; }
  }
  checks.push(check(
    'dkim', 'DKIM Record', !!dkimFound,
    'medium', dkimFound ? '✅' : '⚠️',
    dkimFound ? `Found at ${dkimFound}` : 'Not found (checked 8 common selectors)',
    'Configure DKIM signing in your email provider and add the public key as a TXT record at [selector]._domainkey.yourdomain.com',
    'DKIM lets receivers verify that email was signed by your domain and not tampered with in transit.',
    '📧 Email Security',
  ));
  if (dkimFound) passed++;

  const dmarcRecord = txtRecords.map(r => r.data).find(d => d.startsWith('v=DMARC1'));
  let dmarcPolicy_ = 'none';
  if (dmarcRecord) dmarcPolicy_ = dmarcPolicy(dmarcRecord);
  const dmarcStrict = dmarcPolicy_ === 'REJECT' || dmarcPolicy_ === 'QUARANTINE';
  checks.push(check(
    'dmarc', 'DMARC Policy', dmarcStrict,
    'critical', dmarcStrict ? '✅' : (dmarcRecord ? '⚠️' : '❌'),
    dmarcRecord ? `Policy: ${dmarcPolicy_}` : 'Not configured',
    dmarcStrict ? null : 'Set a DMARC policy of p=quarantine or p=reject to prevent unauthenticated email from reaching inboxes.',
    'DMARC tells receiving servers what to do with email that fails SPF/DKIM. Without p=reject or p=quarantine, spoofed email still lands in inboxes.',
    '📧 Email Security',
  ));
  if (dmarcStrict) passed++;
  else if (dmarcRecord) { /* partial credit for having DMARC even if not strict */ }

  // --- Score ---
  const total = checks.length;
  const score = Math.round((passed / Math.max(total, 1)) * 100);
  const grade = score >= 90 ? 'A' : score >= 70 ? 'B' : score >= 50 ? 'C' : score >= 30 ? 'D' : 'F';

  // Organize into categories for structured display
  const categories = {};
  for (const c of checks) {
    if (!categories[c.category]) categories[c.category] = [];
    categories[c.category].push(c);
  }

  return Response.json({
    domain: cleanDomain,
    timestamp: new Date().toISOString(),
    score,
    grade,
    passed,
    total,
    checks,
    categories,
    severityCounts: {
      critical: checks.filter(c => c.severity === 'critical' && !c.passed).length,
      high: checks.filter(c => c.severity === 'high' && !c.passed).length,
      medium: checks.filter(c => c.severity === 'medium' && !c.passed).length,
    },
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
      'Content-Type': 'application/json',
    },
  });
}
