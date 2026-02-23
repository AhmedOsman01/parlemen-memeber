import { listNews } from "@/models/newsModel";
import Link from "next/link";
import AdminRowActions from "@/components/admin/AdminRowActions";

export default async function AdminNewsList({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const { rows, total } = await listNews({ page, limit: 10 });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <div className="mb-6">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-(--navy) transition-all group"
                >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-(--gold) group-hover:text-(--navy) transition-all">
                        →
                    </span>
                    الرجوع للوحة التحكم
                </Link>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">إدارة الأخبار</h1>
                    <p className="text-gray-600">عرض وإدارة جميع الأخبار المنشورة.</p>
                </div>
                <Link
                    href="/admin/news/new"
                    className="bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold-light transition-all"
                >
                    + إضافة خبر جديد
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">العنوان</th>
                            <th className="px-6 py-4 font-bold text-gray-700">التاريخ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{item.title}</td>
                                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                <td className="px-6 py-4">
                                    <AdminRowActions
                                        id={item.id}
                                        editUrl={`/admin/news/edit/${item.id}`}
                                        deleteApiUrl="/api/admin/news"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {rows.length === 0 && (
                    <div className="p-12 text-center text-gray-500">لا توجد أخبار حالياً.</div>
                )}
            </div>
        </div>
    );
}
