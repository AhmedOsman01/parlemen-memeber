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
  const setCookie = res.headers.get('set-cookie');
  console.log('set-cookie:', !!setCookie);
  const body = await res.text();
  console.log('body:', body);

  if (res.status !== 200 && res.status !== 201) {
    console.error('Token issuance failed; check BASIC_AUTH_USER/PASS and ADMIN_JWT_SECRET in env.');
    process.exit(1);
  }

  // Now request admin page with cookie
  const cookie = setCookie ? setCookie.split(';')[0] : null;
  if (!cookie) {
    console.error('No cookie returned');
    process.exit(1);
  }
  const page = await fetch(`${BASE}/admin/contacts`, { headers: { cookie } });
  console.log('/admin/contacts status:', page.status);
  const html = await page.text();
  console.log('page contains Contacts (admin):', html.includes('Contacts (admin)'));
}

run().catch(e => { console.error(e); process.exit(1); });
