"use client";

import { useRef, useEffect, useState } from "react";

/**
 * شهادات المواطنين — عرض Carousel لشهادات حقيقية من مواطنين تمت خدمتهم
 */

const testimonials = [
  {
    name: "محمد عبد الرحمن",
    location: "القاهرة — حي المعادي",
    text: "تواصلت مع مكتب النائب بخصوص مشكلة الصرف الصحي في منطقتنا، وخلال أسبوعين فقط تم التنسيق مع الجهات المختصة وبدأت أعمال الإصلاح. شكراً لسرعة الاستجابة.",
    avatar: "م",
    color: "bg-blue-600",
  },
  {
    name: "فاطمة السيد",
    location: "القاهرة — مدينة نصر",
    text: "قدمت طلب للمساعدة في تسريع إجراءات العلاج على نفقة الدولة لوالدتي، وتم التنسيق مع وزارة الصحة بشكل سريع. النائب فعلاً قريب من الناس.",
    avatar: "ف",
    color: "bg-rose-600",
  },
  {
    name: "أحمد حسن",
    location: "القاهرة — حلوان",
    text: "بفضل تدخل النائب، تم إنشاء وحدة صحية جديدة في منطقتنا التي كانت تعاني من نقص شديد في الخدمات الصحية. إنجاز حقيقي يستحق التقدير.",
    avatar: "أ",
    color: "bg-emerald-600",
  },
  {
    name: "سارة محمود",
    location: "القاهرة — المقطم",
    text: "استفدت من برنامج التدريب والتوظيف الذي أطلقه النائب، والحمد لله حصلت على فرصة عمل ممتازة. مبادرة رائعة للشباب.",
    avatar: "س",
    color: "bg-purple-600",
  },
  {
    name: "عمر خالد",
    location: "القاهرة — شبرا",
    text: "مشكلة المياه في شارعنا كانت مستمرة لسنوات. بعد التواصل مع مكتب النائب، تم حلها في أقل من شهر. أداء ممتاز وتواصل مستمر.",
    avatar: "ع",
    color: "bg-amber-600",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // RTL: scrollLeft is negative
    const sl = Math.abs(el.scrollLeft);
    setCanScrollLeft(sl > 10);
    setCanScrollRight(sl < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340 * (dir === "left" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 section-divider-gold" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
              صوت المواطنين
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] gold-underline-right">
              شهادات من الشارع
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="التالي"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="السابق"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 -mb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card min-w-[300px] sm:min-w-[340px] max-w-[380px] flex-shrink-0 snap-start"
            >
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--gray-100)]">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--navy)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
