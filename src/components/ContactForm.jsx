"use client";

import { useState } from "react";

/**
 * نموذج التواصل — نموذج اتصال مع التحقق من صحة البيانات
 * يعرض رسائل خطأ ورسالة نجاح عند الإرسال
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /** التعامل مع تغييرات الحقول */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /** التحقق من صحة جميع الحقول */
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب.";
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (!formData.subject.trim()) newErrors.subject = "الموضوع مطلوب.";
    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "يجب أن تكون الرسالة ١٠ أحرف على الأقل.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** معالج الإرسال */
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      if (!validate()) return;
      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          // map validation errors from server if present
          if (data?.errors) {
            setErrors(data.errors);
          } else if (data?.error) {
            setErrors({ form: data.error });
          } else {
            setErrors({ form: "حدث خطأ أثناء إرسال الرسالة" });
          }
          return;
        }

        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        console.error("Contact submit error:", err);
        setErrors({ form: "تعذر الاتصال بالخادم. حاول مرة أخرى لاحقاً." });
      } finally {
        setLoading(false);
      }
    })();
  };

  /** أنماط الحقول */
  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[var(--navy)] placeholder-gray-400 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-[var(--gold)]";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-label="نموذج التواصل"
    >
      {/* رسالة النجاح */}
      {submitted && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium animate-fade-in" role="alert">
          ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {/* الاسم */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          الاسم الكامل <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="أدخل اسمك الكامل"
          className={`${inputBase} ${errors.name ? "border-red-400 ring-red-200" : ""}`}
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* البريد الإلكتروني ورقم الهاتف */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`${inputBase} ${errors.email ? "border-red-400 ring-red-200" : ""}`}
            dir="ltr"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
            رقم الهاتف
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+20 1XX XXX XXXX"
            className={inputBase}
            dir="ltr"
          />
        </div>
      </div>

      {/* الموضوع */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          الموضوع <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="كيف يمكننا مساعدتك؟"
          className={`${inputBase} ${errors.subject ? "border-red-400 ring-red-200" : ""}`}
          aria-required="true"
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      {/* الرسالة */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          الرسالة <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="اكتب رسالتك هنا…"
          className={`${inputBase} resize-none ${errors.message ? "border-red-400 ring-red-200" : ""}`}
          aria-required="true"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-300 hover:bg-[var(--gold-light)] hover:shadow-xl hover:shadow-[var(--gold)]/20 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "جارٍ الإرسال…" : "إرسال الرسالة"}
      </button>
    </form>
  );
}
