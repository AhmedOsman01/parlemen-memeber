"use client";

import { useState } from "react";

/**
 * اسأل النائب — نموذج سريع لطرح سؤال مباشر على النائب
 */
export default function AskMP() {
  const [formData, setFormData] = useState({ name: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.question.trim()) return;

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", question: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[var(--navy)] via-[var(--navy-light)] to-[var(--trust-blue)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[var(--gold)]/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold tracking-wider rounded-full mb-5">
              صوتك مسموع
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              اسأل <span className="text-gradient-gold">النائب</span> مباشرة
            </h2>
            <p className="text-white/50 leading-relaxed mb-6">
              لديك سؤال حول التشريعات أو خدمات الدائرة أو أي قضية تهمك؟
              اطرح سؤالك وسنرد عليك في أقرب وقت.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/40">
                <svg className="w-4 h-4 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                رد خلال ٤٨ ساعة
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <svg className="w-4 h-4 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                سرية تامة
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10">
            {submitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[var(--success)]/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">تم إرسال سؤالك!</h3>
                <p className="text-white/50 text-sm">سنتواصل معك قريباً بالرد.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="اكتب سؤالك هنا..."
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]/50 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[var(--gold)]/20 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      جارٍ الإرسال...
                    </span>
                  ) : (
                    "إرسال السؤال"
                  )}
                </button>
                <p className="text-xs text-white/25 text-center">
                  بياناتك محمية ولن يتم مشاركتها.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
