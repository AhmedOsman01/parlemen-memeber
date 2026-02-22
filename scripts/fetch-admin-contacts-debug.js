const fetch = require('node-fetch');

async function getToken() {
  const res = await fetch('http://localhost:3000/api/admin/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // seeded admin uses BASIC_AUTH_PASS from .env.local which defaults to 'changeme'
    body: JSON.stringify({ username: 'admin', password: 'changeme' }),
    redirect: 'manual',
  });
  const body = await res.text();
  console.log('POST /api/admin/token status', res.status);
  console.log('response body:', body);
  const setCookie = res.headers.get('set-cookie');
  console.log('set-cookie header:', setCookie);
  let token = null;
  try {
    const json = JSON.parse(body);
    token = json.token;
  } catch (e) {}
  // Try to extract admin_jwt from set-cookie
  let cookieHeader = '';
  if (setCookie) {
    cookieHeader = setCookie.split(/,(?=\s*admin_)/).map(s=>s.split(';')[0]).join('; ');
  }
  if (token && !cookieHeader) cookieHeader = `admin_jwt=${token}`;
  return cookieHeader;
}

async function fetchAdmin(cookieHeader) {
  const res = await fetch('http://localhost:3000/admin/contacts', {
    headers: { Cookie: cookieHeader || '' },
    // allow following redirects so we reach the final page
    redirect: 'follow',
  });
  const text = await res.text();
  console.log('GET /admin/contacts status', res.status);
  // Try to extract the first <pre> block (the page includes a debug <pre> with auth info)
  const m = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  if (m) {
    console.log('Found first <pre> block; attempting to parse as JSON...');
    const inner = m[1].trim();
    try {
      const parsed = JSON.parse(inner);
      console.log('Parsed JSON from <pre>:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Could not parse <pre> content as JSON; dumping raw:');
      console.log(inner.slice(0, 2000));
    }
  } else {
    console.log('No <pre> block found; response length', text.length);
  }
  const fs = require('fs');
  if (!fs.existsSync('tmp')) fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync('tmp/admin-contacts.html', text);
  console.log('Saved response to tmp/admin-contacts.html');
}

(async ()=>{
  try {
    const cookieHeader = await getToken();
    console.log('Using Cookie header:', cookieHeader);
    await fetchAdmin(cookieHeader);
  } catch (e) {
    console.error('Error', e);
    process.exit(1);
  }
})();
