import { listContacts } from '@/models/contactModel';
import { cookies } from 'next/headers';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';

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
      // Fallback if decode fails
    }
  }

  const params = searchParams && typeof searchParams.then === 'function'
    ? await searchParams
    : (searchParams || {});

  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 50);
  const q = params?.q || '';
  const token = params?.token || null;

  const { rows, total } = await listContacts({ page, limit, q });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <AdminBreadcrumb items={[{ label: 'إدارة الرسائل' }]} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-(--navy) tracking-tight">إدارة الرسائل</h1>
          <p className="text-gray-500 mt-2">إجمالي الرسائل الواردة: <span className="font-bold text-(--gold)">{total}</span></p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-fit">
            <span>متصل باسم:</span>
            <strong className="text-(--navy)">{adminName}</strong>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <form method="get" className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              name="q"
              defaultValue={q}
              placeholder="البحث بالاسم أو البريد..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--gold)/20 focus:border-(--gold) transition-all outline-none text-sm"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          <input type="hidden" name="token" value={token || ""} />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-(--navy) text-white rounded-xl font-bold text-sm hover:bg-(--navy-light) transition-all shadow-lg shadow-(--navy)/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            بحث
          </button>
        </form>

        <div className="flex justify-end order-first lg:order-last">
          <a
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-600/10"
            href={`/api/contact/export?token=${token}&q=${encodeURIComponent(q)}&limit=1000`}
          >
            <span>📥</span>
            أسماء المصدر (CSV)
          </a>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center border-l w-16">#</th>
              <th className="px-6 py-4 text-sm font-bold text-(--navy)">الاسم</th>
              <th className="px-6 py-4 text-sm font-bold text-(--navy)">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-sm font-bold text-(--navy)">الموضوع</th>
              <th className="px-6 py-4 text-sm font-bold text-(--navy)">الرسالة</th>
              <th className="px-6 py-4 text-sm font-bold text-(--navy) whitespace-nowrap">التاريخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-right">
            {rows.map((c, idx) => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-gray-400 text-center border-l bg-gray-50/30 group-hover:bg-white">{(page - 1) * limit + idx + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-(--navy)">{c.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600" dir="ltr">{c.email}</td>
                <td className="px-6 py-4 text-sm font-semibold text-(--gold)">{c.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="max-w-md line-clamp-2 hover:line-clamp-none transition-all cursor-pointer whitespace-pre-wrap">{c.message}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap" suppressHydrationWarning>
                  {new Date(c.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="py-20 text-center text-gray-400">لا توجد رسائل حالياً</div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rows.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-(--navy)">{c.name}</h3>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded" suppressHydrationWarning>
                {new Date(c.createdAt).toLocaleDateString('ar-EG')}
              </span>
            </div>
            <div className="text-xs text-gray-500 font-medium" dir="ltr">{c.email}</div>
            <div className="text-sm font-bold text-(--gold) border-t border-gray-50 pt-2">الموضوع: {c.subject}</div>
            <div className="text-sm text-gray-600 bg-gray-50/50 p-3 rounded-xl whitespace-pre-wrap">{c.message}</div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="py-20 text-center text-gray-400">لا توجد رسائل حالياً</div>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {page > 1 && (
            <a
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-(--navy) hover:bg-gray-50 transition-all shadow-sm group"
              href={`?token=${token}&page=${page - 1}&limit=${limit}`}
            >
              <span>→</span> السابقة
            </a>
          )}
          <span className="text-sm font-bold text-gray-400 mx-4">صفحة {page}</span>
          {total > page * limit && (
            <a
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-(--navy) hover:bg-gray-50 transition-all shadow-sm group"
              href={`?token=${token}&page=${page + 1}&limit=${limit}`}
            >
              التالية <span>←</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
