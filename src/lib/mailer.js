// Optional mailer using Nodemailer. Sends a simple notification when a new contact is created.
let transporter;

export async function sendContactNotification({ name, email, subject, message }) {
  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) return false; // mailer not configured

  if (!transporter) {
    // dynamic import to avoid bundling on client
    const nodemailer = await import('nodemailer');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@example.com';
  const to = process.env.EMAIL_TO || from;
  const subjectLine = `New contact: ${subject} — ${name}`;
  const html = `<p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Message:</strong></p>
  <div>${message.replace(/\n/g, '<br/>')}</div>`;

  const info = await transporter.sendMail({ from, to, subject: subjectLine, html });
  return info;
}
