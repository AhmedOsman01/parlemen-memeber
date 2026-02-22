"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        body: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push("/admin/news");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">إضافة خبر جديد</h1>
                    <p className="text-gray-600">قم بتعبئة التفاصيل أدناه لنشر مقال إخباري جديد.</p>
                </div>
                <Link href="/admin/news" className="text-navy hover:underline">
                    العودة للقائمة
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">عنوان الخبر</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">ملخص قصير</label>
                    <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">محتوى الخبر (HTML أو نص)</label>
                    <textarea
                        required
                        rows={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none font-mono text-sm"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">رابط الصورة</label>
                        <input
                            type="url"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            placeholder="https://images.unsplash.com/..."
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">تاريخ النشر</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy-light transition-all disabled:opacity-50"
                    >
                        {loading ? "جاري الحفظ..." : "نشر الخبر"}
                    </button>
                </div>
            </form>
        </div>
    );
}
