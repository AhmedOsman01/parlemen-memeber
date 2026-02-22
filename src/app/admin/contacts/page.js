import { listContacts } from '@/models/contactModel';
import { cookies } from 'next/headers';
import AdminLogout from '@/components/AdminLogout';

export const dynamic = 'force-dynamic';

export default async function ContactsAdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const adminJwt = cookieStore.get('admin_jwt')?.value;
  let adminName = 'Admin';

  if (adminJwt) {
    try {
      const parts = adminJwt.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        adminName = payload.sub || 'Admin';
      }
    } catch (e) {
      // Fallback if decode fails, but middleware/layout already verified
    }
  }

  // `searchParams` may be a Promise in some Next.js runtimes — ensure we have the resolved object
  const params = searchParams && typeof searchParams.then === 'function'
    ? await searchParams
    : (searchParams || {});

  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 50);
  const q = params?.q || '';
  // keep any token query param in scope for links/forms
  const token = params?.token || null;

  const { rows, total } = await listContacts({ page, limit, q });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Contacts (admin)</h1>
      <div className="mt-3 flex items-center gap-3">
        <div className="text-sm text-gray-700">Logged in as <strong>{adminName}</strong></div>
        <div>
          <AdminLogout />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Total: {total}</p>

      <div className="mt-6 flex items-center gap-3">
        <form method="get" className="flex items-center gap-2">
          <input name="q" defaultValue={q} placeholder="search" className="px-3 py-2 border rounded" />
          <input type="hidden" name="token" value={token || ""} />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Search</button>
        </form>
        <a
          className="px-3 py-2 bg-green-600 text-white rounded"
          href={`/api/contact/export?token=${token}&q=${encodeURIComponent(q)}&limit=1000`}
        >
          Export CSV
        </a>
      </div>

      <div className="mt-6 overflow-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Subject</th>
              <th className="px-3 py-2 border">Message</th>
              <th className="px-3 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="align-top">
                <td className="px-3 py-2 border align-top">{c.name}</td>
                <td className="px-3 py-2 border align-top" dir="ltr">{c.email}</td>
                <td className="px-3 py-2 border align-top">{c.subject}</td>
                <td className="px-3 py-2 border align-top"><div className="max-w-xl whitespace-pre-wrap">{c.message}</div></td>
                <td className="px-3 py-2 border align-top" suppressHydrationWarning>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {page > 1 && (
          <a className="px-3 py-2 border rounded" href={`?token=${token}&page=${page - 1}&limit=${limit}`}>Previous</a>
        )}
        {total > page * limit && (
          <a className="px-3 py-2 border rounded" href={`?token=${token}&page=${page + 1}&limit=${limit}`}>Next</a>
        )}
      </div>
    </div>
  );
}
