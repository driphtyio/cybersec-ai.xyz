/**
 * Scan API — Cloudflare Pages Function
 * Accepts ?domain=example.com, returns security posture JSON.
 */

// Cloudflare DNS-over-HTTPS endpoint (respects RFC 8484)
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

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const domain = url.searchParams.get('domain') || '';

  // Validate domain
  if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
    return Response.json({ error: 'Invalid domain' }, { status: 400 });
  }

  const cleanDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();

  const results = {
    domain: cleanDomain,
    timestamp: new Date().toISOString(),
    score: 0,
    checks: {},
  };

  let passed = 0;
  let total = 0;

  // --- HTTP + Headers ---
  total++;
  try {
    const httpsUrl = `https://${cleanDomain}/`;
    const resp = await fetch(httpsUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });

    const headers = {};
    for (const [key, val] of resp.headers) {
      if (['strict-transport-security', 'content-security-policy',
           'x-frame-options', 'x-content-type-options',
           'referrer-policy', 'permissions-policy',
           'server', 'x-powered-by'].includes(key)) {
        headers[key] = val;
      }
    }

    // Final URL after redirects tells us if we landed on same domain
    const finalUrl = new URL(resp.url);
    const redirectOK = finalUrl.hostname === cleanDomain;
    const hsts = headers['strict-transport-security'] || '';

    results.checks.http = {
      status: resp.status,
      finalHost: finalUrl.hostname,
      hsts: hsts ? { present: true, value: hsts } : { present: false },
      csp: headers['content-security-policy'] ? true : false,
      xfo: headers['x-frame-options'] || null,
      xcto: headers['x-content-type-options'] || null,
      referrerPolicy: headers['referrer-policy'] || null,
      server: headers['server'] || null,
    };

    if (hsts) passed++;
    if (headers['content-security-policy']) passed++;
    if (headers['x-frame-options']) passed++;
    if (headers['x-content-type-options']) passed++;
    if (redirectOK) passed++;
  } catch (e) {
    results.checks.http = { error: e.message };
  }

  // --- HTTP→HTTPS Redirect ---
  total++;
  try {
    const httpUrl = `http://${cleanDomain}/`;
    const resp = await fetch(httpUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    });
    const redirects = resp.status >= 300 && resp.status < 400;
    const location = resp.headers.get('location') || '';
    const toHttps = location.startsWith('https://');
    results.checks.redirect = { redirects, toHttps, status: resp.status };
    if (redirects && toHttps) passed++;
  } catch (e) {
    results.checks.redirect = { error: e.message };
  }

  // --- DNS: SPF ---
  total++;
  const { records: spfRecords } = await queryDNS(cleanDomain, 'TXT');
  const spf = spfRecords
    .map(r => r.data)
    .find(d => d.startsWith('v=spf1'));
  results.checks.spf = spf ? { present: true, value: spf } : { present: false };
  if (spf) passed++;

  // --- DNS: DKIM (common selectors) ---
  total++;
  const selectors = ['default', 'google', 'selector1', 'selector2', 'dkim', 'mail', 's1', 's2'];
  let dkimFound = null;
  for (const sel of selectors) {
    const { records } = await queryDNS(`${sel}._domainkey.${cleanDomain}`, 'TXT');
    if (records.length) {
      dkimFound = `${sel}._domainkey.${cleanDomain}`;
      break;
    }
  }
  results.checks.dkim = dkimFound ? { present: true, selector: dkimFound } : { present: false };
  if (dkimFound) passed++;

  // --- DNS: DMARC ---
  total++;
  const { records: dmarcRecords } = await queryDNS(`_dmarc.${cleanDomain}`, 'TXT');
  const dmarc = dmarcRecords.map(r => r.data).find(d => d.startsWith('v=DMARC1'));
  if (dmarc) {
    const policy = dmarcPolicy(dmarc);
    results.checks.dmarc = { present: true, policy, raw: dmarc };
    if (policy === 'REJECT' || policy === 'QUARANTINE') passed++;
  } else {
    results.checks.dmarc = { present: false };
  }

  // --- Score ---
  results.score = Math.round((passed / Math.max(total, 1)) * 100);
  results.passed = passed;
  results.total = total;

  return Response.json(results, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
      'Content-Type': 'application/json',
    },
  });
}
