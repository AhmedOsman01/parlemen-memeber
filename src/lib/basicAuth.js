// Basic auth helper used by server routes and admin pages.
export function parseBasicAuthHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) return null;
  try {
    const b64 = authHeader.split(' ')[1];
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch (e) {
    return null;
  }
}

export function checkBasicAuthFromHeader(authHeader) {
  const creds = parseBasicAuthHeader(authHeader);
  if (!creds) return false;
  const { user, pass } = creds;
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;
  if (!expectedUser || !expectedPass) return false;
  return user === expectedUser && pass === expectedPass;
}
