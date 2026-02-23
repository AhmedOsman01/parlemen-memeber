import { listTimelineItems } from "@/models/timelineModel";
import Link from "next/link";
import AdminRowActions from "@/components/admin/AdminRowActions";

export default async function AdminTimelineList() {
    const items = await listTimelineItems();

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
                    <h1 className="text-3xl font-bold">إدارة الجدول الزمني</h1>
                    <p className="text-gray-600">تحويل مسيرة النائب إلى نقاط مضيئة في الجدول الزمني.</p>
                </div>
                <Link
                    href="/admin/timeline/new"
                    className="bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold-light transition-all"
                >
                    + إضافة حدث جديد
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="text-2xl font-bold text-gold shrink-0 w-20">{item.year}</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                <div className="flex gap-4 mt-3">
                                    <AdminRowActions
                                        id={item.id}
                                        editUrl={`/admin/timeline/edit/${item.id}`}
                                        deleteApiUrl="/api/admin/timeline"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="p-12 text-center text-gray-500">لا توجد أحداث في الجدول الزمني حالياً.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
