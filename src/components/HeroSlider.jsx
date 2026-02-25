"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Link from "next/link";
import { slides } from "@/data/slides";
import { getDirectImageUrl } from "@/lib/imageUtils";

/* أنماط Swiper */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/**
 * العرض الرئيسي — عرض شرائح Swiper رسمي بارتفاع مقيد
 * تصميم مؤسسي مع تدرج لوني أنيق وأزرار هادئة
 */
export default function HeroSlider({ initialSlides }) {
  const displaySlides = initialSlides && initialSlides.length > 0 ? initialSlides : slides;

  return (
    <section
      className="relative w-full"
      style={{ height: 'min(85vh, 700px)', minHeight: '500px' }}
      aria-label="عرض الصور الرئيسي"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        dir="rtl"
        className="w-full h-full"
        aria-live="polite"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* صورة الخلفية */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getDirectImageUrl(slide.image) || "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1920&q=80"})` }}
              >
                {/* Gradient overlay — institutional dark feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-950)] via-[var(--navy)]/70 to-[var(--navy)]/40" />
              </div>

              {/* محتوى الشريحة */}
              <div className="relative z-10 flex items-end h-full pb-20 sm:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    {/* خط ذهبي زخرفي */}
                    <div className="w-12 h-[3px] bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] mb-5 rounded-full" />

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-lg">
                      {slide.subtitle}
                    </p>

                    {/* أزرار الإجراء */}
                    <div className="flex flex-wrap items-center gap-3">
                      {slide.cta ? (
                        <Link
                          href={slide.cta.href}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-lg"
                        >
                          {slide.cta.label}
                          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      ) : (
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-lg"
                        >
                          تواصل معنا
                          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )}

                      <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white/80 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                      >
                        عن النائب
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-40 z-20" />
    </section>
  );
}
