"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function NewSlidePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        image: "",
        order: 0,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push("/admin/slides");
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
                { label: 'إدارة السلايدر', href: '/admin/slides' },
                { label: 'إضافة صورة جديدة' },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold">إضافة صورة سلايدر جديدة</h1>
                <p className="text-gray-600">أضف صوراً جديدة للعرض المتحرك في الصفحة الرئيسية.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">العنوان الرئيسي</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">العنوان الفرعي</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">رابط الصورة</label>
                        <input
                            type="url"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            placeholder="https://images.unsplash.com/..."
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">الترتيب</label>
                        <input
                            type="number"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
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
                                حفظ الصورة
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
