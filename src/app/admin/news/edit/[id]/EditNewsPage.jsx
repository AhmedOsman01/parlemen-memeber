"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function EditNewsPage({ news }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: news.id,
    title: news.title || "",
    excerpt: news.excerpt || "",
    body: news.body || "",
    image: news.image || "",
    date: news.date || new Date().toISOString().split("T")[0],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: "PUT",
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <AdminBreadcrumb items={[
        { label: 'إدارة الأخبار', href: '/admin/news' },
        { label: 'تعديل الخبر' },
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">تعديل الخبر</h1>
        <p className="text-gray-600">تعديل تفاصيل المقال الإخباري.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                حفظ التعديلات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
