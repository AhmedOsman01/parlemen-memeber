"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Link from "next/link";
import { slides } from "@/data/slides";

/* أنماط Swiper */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/**
 * العرض الرئيسي — عرض شرائح Swiper بالعرض الكامل مع نصوص وأزرار
 * يستخدم تأثير التلاشي والتشغيل التلقائي والتنقل باللمس/لوحة المفاتيح
 */
export default function HeroSlider({ initialSlides }) {
  const displaySlides = initialSlides && initialSlides.length > 0 ? initialSlides : slides;
  return (
    <section className="relative w-full h-screen min-h-[600px]" aria-label="عرض الصور الرئيسي">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        dir="rtl"
        className="w-full h-full"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* صورة الخلفية */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-(--navy-dark) via-(--navy)/60 to-(--navy)/30" />
              </div>

              {/* محتوى الشريحة */}
              <div className="relative z-10 flex items-center h-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    {/* خط ذهبي زخرفي */}
                    <div className="w-16 h-1 bg-(--gold) mb-6 rounded-full" />

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* زر الإجراء */}
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-(--gold) text-(--navy) font-semibold text-base transition-all duration-300 hover:bg-(--gold-light) hover:shadow-xl hover:shadow-(--gold)/30 hover:scale-105"
                    >
                      {slide.cta.label}
                      <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* مؤشر التمرير */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-(--gold)" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
