"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function NewTimelinePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        year: "",
        title: "",
        description: "",
        icon: "briefcase",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/timeline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push("/admin/timeline");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <AdminBreadcrumb items={[
                { label: 'إدارة الجدول الزمني', href: '/admin/timeline' },
                { label: 'إضافة حدث جديد' },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold">إضافة حدث للجدول الزمني</h1>
                <p className="text-gray-600">أضف محطات جديدة في مسيرة النائب المهنية والسياسية.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">السنة</label>
                        <input
                            type="text"
                            required
                            placeholder="مثال: ٢٠٢٦"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">الأيقونة (اختياري)</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        >
                            <option value="briefcase">حقيبة (عمل)</option>
                            <option value="graduation-cap">قبعة تخرج (تعليم)</option>
                            <option value="award">وسام (إنجاز)</option>
                            <option value="users">أشخاص (خدمة مجتمعية)</option>
                            <option value="landmark">صرح (برلمان)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">العنوان</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">الوصف</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="pt-6 flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-navy text-white rounded-xl font-bold text-base hover:bg-navy-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                حفظ الحدث
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
