"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditTimelinePage({ item }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: item.id,
    year: item.year || "",
    title: item.title || "",
    description: item.description || "",
    icon: item.icon || "briefcase",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/timeline", {
        method: "PUT",
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
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 overflow-hidden">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/admin/timeline"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-(--navy) transition-all group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-(--gold) group-hover:text-(--navy) transition-all">
              →
            </span>
            الرجوع للجدول الزمني
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">تعديل حدث الجدول الزمني</h1>
            <p className="text-gray-600">تعديل تفاصيل المحطة الزمنية.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">السنة</label>
            <input
              type="text"
              required
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

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy-light transition-all disabled:opacity-50"
          >
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </form>
    </div>
  );
}
