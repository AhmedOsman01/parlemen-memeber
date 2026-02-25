"use client";

import { useState } from "react";

/**
 * نموذج التواصل — نموذج اتصال رسمي مع تصنيف الموضوعات
 * يتضمن قائمة منسدلة للموضوع وإشعار خصوصية
 */

const subjectOptions = [
  { value: "", label: "اختر الموضوع *" },
  { value: "استفسار برلماني", label: "استفسار برلماني" },
  { value: "تقديم شكوى", label: "تقديم شكوى" },
  { value: "اقتراح تشريعي", label: "اقتراح تشريعي" },
  { value: "طلب لقاء", label: "طلب لقاء" },
  { value: "أخرى", label: "أخرى" },
];

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
    if (!formData.subject) newErrors.subject = "الموضوع مطلوب.";
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
    "w-full px-4 py-3 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-200)] text-[var(--navy)] placeholder-[var(--gray-400)] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)] focus:bg-white";
  const errorInput = "border-[var(--error)] ring-1 ring-[var(--error)]/20";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-label="نموذج التواصل"
    >
      {/* رسالة الخطأ العامة */}
      {errors.form && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--error-light)] border border-[var(--error)]/20 text-[var(--error)] text-sm" role="alert">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {errors.form}
        </div>
      )}

      {/* رسالة النجاح */}
      {submitted && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--success-light)] border border-[var(--success)]/20 text-[var(--success)] text-sm animate-fade-in" role="alert">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {/* الاسم */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          الاسم الكامل <span className="text-[var(--error)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="أدخل اسمك الكامل"
          className={`${inputBase} ${errors.name ? errorInput : ""}`}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--error)]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* البريد الإلكتروني ورقم الهاتف */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
            البريد الإلكتروني <span className="text-[var(--error)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`${inputBase} ${errors.email ? errorInput : ""}`}
            dir="ltr"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--error)]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {errors.email}
            </p>
          )}
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

      {/* الموضوع — قائمة منسدلة */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          نوع الطلب <span className="text-[var(--error)]">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`${inputBase} cursor-pointer ${!formData.subject ? 'text-[var(--gray-400)]' : ''} ${errors.subject ? errorInput : ""}`}
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        >
          {subjectOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={!opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--error)]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.subject}
          </p>
        )}
      </div>

      {/* الرسالة */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--navy)] mb-1.5">
          الرسالة <span className="text-[var(--error)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="اكتب رسالتك هنا…"
          className={`${inputBase} resize-none ${errors.message ? errorInput : ""}`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--error)]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.message}
          </p>
        )}
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            جارٍ الإرسال…
          </>
        ) : (
          "إرسال الرسالة"
        )}
      </button>

      {/* إشعار الخصوصية */}
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        بإرسال هذا النموذج، توافق على معالجة بياناتك لغرض الرد على استفسارك. لن يتم مشاركة بياناتك مع أطراف ثالثة.
      </p>
    </form>
  );
}
