// Simple integration test for admin login flow.
// Usage: TEST_BASE_URL=http://localhost:3000 node ./scripts/test-admin-auth.js

const BASE = process.env.TEST_BASE_URL || 'http://localhost:3000';
const USER = process.env.TEST_ADMIN_USER || 'admin';
const PASS = process.env.TEST_ADMIN_PASS || 'changeme';

async function run() {
  console.log('POST /api/admin/token to obtain cookie');
  const res = await fetch(`${BASE}/api/admin/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USER, password: PASS })
  });
  console.log('status:', res.status);
  const setCookieHeader = res.headers.get('set-cookie');
  const rawSetCookie = setCookieHeader ? [setCookieHeader] : [];
  console.log('set-cookie count:', rawSetCookie.length);
  const body = await res.text();
  console.log('body:', body);

  if (res.status !== 200 && res.status !== 201) {
    console.error('Token issuance failed; check BASIC_AUTH_USER/PASS and ADMIN_JWT_SECRET in env.');
    process.exit(1);
  }

  // Build cookie header from returned set-cookie headers
  const cookieHeader = rawSetCookie.map(s => s.split(';')[0]).join('; ');
  if (!cookieHeader) {
    console.error('No cookie returned');
    process.exit(1);
  }
  console.log('cookie header:', cookieHeader);

  // Extract admin_csrf value to send in x-csrf header for POSTs
  const adminCsrf = rawSetCookie.map(s => s.split(';')[0]).find(s => s.startsWith('admin_csrf='));
  const csrfVal = adminCsrf ? adminCsrf.split('=')[1] : null;

  const page = await fetch(`${BASE}/admin/contacts`, { headers: { cookie: cookieHeader } });
  console.log('/admin/contacts status:', page.status);
  const html = await page.text();
  console.log('page contains Contacts (admin):', html.includes('Contacts (admin)'));

  // Now call logout with cookie and x-csrf header
  if (csrfVal) {
    const logoutRes = await fetch(`${BASE}/api/admin/logout`, { method: 'POST', headers: { cookie: cookieHeader, 'x-csrf': csrfVal } });
    console.log('/api/admin/logout status:', logoutRes.status);
  } else {
    console.log('No admin_csrf cookie; skipping logout POST');
  }

  // After logout, try admin page again (should be unauthorized)
  const page2 = await fetch(`${BASE}/admin/contacts`, { headers: { cookie: cookieHeader } });
  console.log('after logout /admin/contacts status:', page2.status);
}

run().catch(e => { console.error(e); process.exit(1); });
