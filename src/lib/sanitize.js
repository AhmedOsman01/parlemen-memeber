// Very small sanitizer utility to remove HTML tags and trim input.
export function sanitizeString(input) {
  if (input == null) return "";
  const s = String(input);
  // remove HTML tags
  return s.replace(/<[^>]*>/g, "").trim();
}

export function sanitizeContactPayload(payload) {
  return {
    name: sanitizeString(payload.name),
    email: sanitizeString(payload.email),
    phone: sanitizeString(payload.phone || ""),
    subject: sanitizeString(payload.subject),
    message: sanitizeString(payload.message),
  };
}
