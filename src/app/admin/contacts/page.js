import { listContacts } from '@/models/contactModel';
import { headers, cookies } from 'next/headers';
import { checkBasicAuthFromHeader } from '@/lib/basicAuth';
import { authorizeAdmin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function ContactsAdminPage({ searchParams }) {
  // If BASIC_AUTH is configured, check headers first
  const hdrs = headers();
  const authHeader = hdrs.get('authorization');
  // If Basic Auth provided, honor it
  const basicOk = checkBasicAuthFromHeader(authHeader);
  // Otherwise, attempt cookie or ADMIN_TOKEN
  if (!basicOk) {
    // Build a fake request object for authorizeAdmin to reuse logic (it expects req.headers.get)
    const cookieStore = cookies();
    const adminJwt = cookieStore.get('admin_jwt')?.value || null;
    const fakeReq = {
      headers: {
        get: (k) => {
          if (k.toLowerCase() === 'authorization') {
            return adminJwt ? `Bearer ${adminJwt}` : null;
          }
          if (k.toLowerCase() === 'x-admin-token') {
            return null;
          }
          return null;
        },
      },
    };

  const authResult = await authorizeAdmin(fakeReq);
  const adminName = authResult && authResult.payload ? authResult.payload.sub : null;
  if (!authResult || !authResult.ok) {
      // Last fallback: ADMIN_TOKEN via query param
      const token = searchParams?.token || null;
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
            <p className="mt-4">Please sign in via <a className="text-blue-600" href="/admin/login">the admin login</a> or provide ?token=&lt;ADMIN_TOKEN&gt; in the URL.</p>
          </div>
        );
      }
    }
    // attach adminName for rendering
    var __adminName = adminName;
  }

  const page = Number(searchParams?.page || 1);
  const limit = Number(searchParams?.limit || 50);
  const q = searchParams?.q || '';

  const { rows, total } = await listContacts({ page, limit, q });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Contacts (admin)</h1>
      <div className="mt-3 flex items-center gap-3">
        {typeof __adminName !== 'undefined' && __adminName ? <div className="text-sm text-gray-700">Logged in as <strong>{__adminName}</strong></div> : null}
        <div>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
          </form>
        </div>
        <div>
          {/* Client-side logout button */}
          <script dangerouslySetInnerHTML={{ __html: "(function(){})();" }} />
        </div>
      </div>
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
