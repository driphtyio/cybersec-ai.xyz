/**
 * Headers API — Cloudflare Pages Function
 * Deep security headers analysis with A-F grading + remediation.
 * Accepts ?url=https://example.com
 */
function gradeHsts(value) {
  if (!value) return { grade: 'F', label: 'HSTS not set', remediation: 'Set Strict-Transport-Security header with max-age=31536000, includeSubDomains, and preload.' };
  const maxAge = parseInt(value.match(/max-age=(\d+)/)?.[1] || '0', 10);
  const hasSub = value.includes('includeSubDomains');
  const hasPreload = value.includes('preload');
  if (maxAge >= 31536000 && hasSub && hasPreload) return { grade: 'A', label: 'HSTS configured with preload', remediation: null };
  if (maxAge >= 31536000 && hasSub) return { grade: 'B', label: 'HSTS with includeSubDomains', remediation: 'Add "preload" to qualify for browser preload lists.' };
  if (maxAge >= 180) return { grade: 'C', label: 'HSTS present, short duration', remediation: 'Increase max-age to 31536000 (1 year) and add includeSubDomains.' };
  return { grade: 'D', label: 'HSTS too short', remediation: 'Set max-age to at least 31536000 (1 year).' };
}

function gradeCsp(value) {
  if (!value) return { grade: 'F', label: 'CSP not set', remediation: 'Set Content-Security-Policy header. Start with restrictive defaults: default-src \'self\'; script-src \'self\'; object-src \'none\'.' };
  const hasUnsafeInline = value.includes("'unsafe-inline'");
  const hasUnsafeEval = value.includes("'unsafe-eval'");
  const hasFrameAncestors = value.includes('frame-ancestors');
  const hasDefaultSrc = value.includes('default-src');
  if (!hasUnsafeInline && !hasUnsafeEval && hasFrameAncestors && hasDefaultSrc) return { grade: 'A', label: 'Strong CSP with frame-ancestors', remediation: null };
  if (!hasUnsafeInline && !hasUnsafeEval) return { grade: 'B', label: 'CSP configured, no unsafe-inline/eval', remediation: 'Add frame-ancestors to prevent clickjacking.' };
  if (hasFrameAncestors) return { grade: 'C', label: 'CSP present but uses unsafe-inline/eval', remediation: 'Remove unsafe-inline and unsafe-eval. Use nonces or hashes instead.' };
  return { grade: 'D', label: 'CSP present, weak configuration', remediation: 'Remove unsafe-inline/unsafe-eval. Add frame-ancestors. Specify default-src.' };
}

function gradeXfo(value) {
  if (!value) return { grade: 'F', label: 'X-Frame-Options not set', remediation: 'Set X-Frame-Options: DENY or X-Frame-Options: SAMEORIGIN.' };
  if (value === 'DENY') return { grade: 'A', label: 'X-Frame-Options: DENY', remediation: null };
  if (value === 'SAMEORIGIN') return { grade: 'B', label: 'X-Frame-Options: SAMEORIGIN', remediation: 'Upgrade to DENY if framing from other origins is not needed.' };
  return { grade: 'D', label: `X-Frame-Options: ${value}`, remediation: 'Use DENY or SAMEORIGIN. ALLOW-FROM is deprecated.' };
}

function gradeXcto(value) {
  if (!value) return { grade: 'F', label: 'X-Content-Type-Options not set', remediation: 'Set X-Content-Type-Options: nosniff to prevent MIME sniffing.' };
  if (value === 'nosniff') return { grade: 'A', label: 'X-Content-Type-Options: nosniff', remediation: null };
  return { grade: 'C', label: `X-Content-Type-Options: ${value} (unexpected)`, remediation: 'Set to "nosniff".' };
}

function gradeReferrerPolicy(value) {
  if (!value) return { grade: 'F', label: 'Referrer-Policy not set', remediation: 'Set Referrer-Policy to strict-origin-when-cross-origin or no-referrer.' };
  const strictPolicies = ['no-referrer', 'strict-origin-when-cross-origin', 'same-origin', 'strict-origin'];
  if (strictPolicies.includes(value)) return { grade: 'A', label: `Referrer-Policy: ${value}`, remediation: null };
  return { grade: 'C', label: `Referrer-Policy: ${value}`, remediation: 'Upgrade to strict-origin-when-cross-origin or no-referrer.' };
}

function gradePermissionsPolicy(value) {
  if (!value) return { grade: 'C', label: 'Permissions-Policy not set', remediation: 'Set Permissions-Policy to restrict access to sensitive APIs (camera, microphone, geolocation).' };
  return { grade: 'A', label: 'Permissions-Policy configured', remediation: null };
}

function gradeServer(value) {
  if (!value) return { grade: 'A', label: 'No Server header leak', remediation: null };
  return { grade: 'C', label: `Server header leaks version: ${value}`, remediation: 'Remove or obscure the Server header to reduce information disclosure.' };
}

function gradeXPoweredBy(value) {
  if (!value) return { grade: 'A', label: 'No X-Powered-By leak', remediation: null };
  return { grade: 'C', label: `X-Powered-By leaks: ${value}`, remediation: 'Remove the X-Powered-By header from server responses.' };
}

function gradeCorp(value) {
  if (!value) return { grade: 'C', label: 'Cross-Origin-Resource-Policy not set', remediation: 'Set Cross-Origin-Resource-Policy: same-origin or same-site to control resource sharing.' };
  return { grade: 'A', label: `Cross-Origin-Resource-Policy: ${value}`, remediation: null };
}

// Headers that are checked even when present (positive security indicators)
const POSITIVE_HEADERS = [
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'cross-origin-resource-policy',
  'cross-origin-opener-policy',
  'cross-origin-embedder-policy',
];

// Headers that should NOT be present (information leakage)
const LEAK_HEADERS = ['server', 'x-powered-by', 'x-aspnet-version', 'x-aspnetmvc-version'];

function overallGrade(results) {
  const order = { A: 5, B: 4, C: 3, D: 2, F: 1 };
  const weights = {
    'strict-transport-security': 3,
    'content-security-policy': 3,
    'x-frame-options': 2,
    'x-content-type-options': 1,
    'referrer-policy': 1,
    'permissions-policy': 1,
    'server-leak': 1,
    'x-powered-by-leak': 1,
  };
  let totalScore = 0, totalWeight = 0;
  for (const [key, r] of Object.entries(results)) {
    const w = weights[key] || 1;
    totalScore += (order[r.grade] || 0) * w;
    totalWeight += w;
  }
  const avg = totalScore / Math.max(totalWeight, 1);
  if (avg >= 4.5) return 'A';
  if (avg >= 3.5) return 'B';
  if (avg >= 2.5) return 'C';
  if (avg >= 1.5) return 'D';
  return 'F';
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url') || '';
  const clean = targetUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();

  if (!clean || !/^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean)) {
    return Response.json({ error: 'Invalid URL. Enter a domain like example.com' }, { status: 400 });
  }

  const startTime = Date.now();
  const httpsUrl = `https://${clean}/`;

  try {
    const resp = await fetch(httpsUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    const headers = {};
    for (const [key, val] of resp.headers) {
      headers[key] = val;
    }

    const finalUrl = new URL(resp.url);
    const httpOk = resp.status;

    // Grade each header
    const results = {
      'strict-transport-security': gradeHsts(headers['strict-transport-security']),
      'content-security-policy': gradeCsp(headers['content-security-policy']),
      'x-frame-options': gradeXfo(headers['x-frame-options']),
      'x-content-type-options': gradeXcto(headers['x-content-type-options']),
      'referrer-policy': gradeReferrerPolicy(headers['referrer-policy']),
      'permissions-policy': gradePermissionsPolicy(headers['permissions-policy']),
      'cross-origin-resource-policy': gradeCorp(headers['cross-origin-resource-policy']),
      'server-leak': gradeServer(headers['server']),
      'x-powered-by-leak': gradeXPoweredBy(headers['x-powered-by']),
    };

    // Count detected headers
    const detected = POSITIVE_HEADERS.filter(h => !!headers[h]).length;
    const leaks = LEAK_HEADERS.filter(h => !!headers[h]);

    return Response.json({
      ok: true,
      domain: clean,
      score: overallGrade(results),
      totalHeaders: Object.keys(headers).length,
      secureHeaders: detected,
      infoLeaks: leaks.length,
      httpOk,
      finalHost: finalUrl.hostname,
      ms: Date.now() - startTime,
      results,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return Response.json({
      ok: false,
      domain: clean,
      error: e.message,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}
