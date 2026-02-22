(async()=>{
  const res = await fetch('http://localhost:3000/api/admin/token', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username: 'admin', password: 'changeme' }) });
  console.log('status', res.status);
  const sc = res.headers.get('set-cookie') || '';
  console.log('set-cookie:', sc);
  const m = sc.match(/admin_jwt=([^;]+)/);
  const token = m ? m[1] : null;
  console.log('token present', !!token);
  if (!token) return;
  const jwt = require('jsonwebtoken');
  const secret = process.env.ADMIN_JWT_SECRET || 'replace_with_a_long_random_secret';
  try {
    const p = jwt.verify(token, secret);
    console.log('verified payload', p);
  } catch (e) {
    console.error('verify error', e.message);
  }
})();
