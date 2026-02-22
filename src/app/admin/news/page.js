import { listNews } from "@/models/newsModel";
import Link from "next/link";

export default async function AdminNewsList({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const { rows, total } = await listNews({ page, limit: 10 });

    return (
        <div className="p-8">
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
                                <td className="px-6 py-4 flex gap-4">
                                    <button className="text-blue-600 hover:underline">تعديل</button>
                                    <button className="text-red-600 hover:underline">حذف</button>
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
