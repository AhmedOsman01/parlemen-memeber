import { listContacts } from '@/models/contactModel';
import { headers } from 'next/headers';
import { checkBasicAuthFromHeader } from '@/lib/basicAuth';

export const dynamic = 'force-dynamic';

export default async function ContactsAdminPage({ searchParams }) {
  const token = searchParams?.token || null;
  // If BASIC_AUTH is configured, check headers first
  const hdrs = headers();
  const auth = hdrs.get('authorization');
  const basicOk = checkBasicAuthFromHeader(auth);

  if (!basicOk) {
    if (!process.env.ADMIN_TOKEN) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Admin contacts</h1>
          <p className="mt-4">ADMIN_TOKEN is not configured. Please set it in your environment to use the admin UI.</p>
        </div>
      );
    }

    if (token !== process.env.ADMIN_TOKEN) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Unauthorized</h1>
          <p className="mt-4">You must provide ?token=&lt;ADMIN_TOKEN&gt; in the URL or use Basic auth to view this page.</p>
        </div>
      );
    }
  }

  const page = Number(searchParams?.page || 1);
  const limit = Number(searchParams?.limit || 50);
  const q = searchParams?.q || '';

  const { rows, total } = await listContacts({ page, limit, q });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Contacts (admin)</h1>
      <p className="text-sm text-gray-600 mt-2">Total: {total}</p>

      <div className="mt-6 flex items-center gap-3">
        <form method="get" className="flex items-center gap-2">
          <input name="q" defaultValue={q} placeholder="search" className="px-3 py-2 border rounded" />
          <input type="hidden" name="token" value={token} />
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
                <td className="px-3 py-2 border align-top">{new Date(c.createdAt).toLocaleString()}</td>
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
