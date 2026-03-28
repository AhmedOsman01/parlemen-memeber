"use client";

import { useEffect, useRef, useState } from "react";

/**
 * مقاييس التأثير — إحصائيات متحركة بعداد يعمل عند دخول المكون في viewport
 * يستخدم IntersectionObserver لتفعيل العد تلقائياً
 */

const stats = [
  {
    value: 12,
    suffix: "+",
    label: "مشروع قانون",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
    ),
    description: "مشاريع قوانين مقدمة في مجالات متعددة",
  },
  {
    value: 5,
    suffix: "",
    label: "عضوية لجان",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
    ),
    description: "لجان برلمانية بما فيها التعليم والاقتصاد",
  },
  {
    value: 50,
    suffix: " ألف+",
    label: "مواطن تمت خدمتهم",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
    ),
    description: "مواطن تمت خدمتهم بشكل مباشر",
  },
  {
    value: 98,
    suffix: "٪",
    label: "نسبة الحضور",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    description: "نسبة حضور في الجلسات البرلمانية",
  },
  {
    value: 320,
    suffix: "+",
    label: "مشكلة تم حلها",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
    ),
    description: "شكوى وطلب تم التعامل معهم",
  },
];

function AnimatedCounter({ target, suffix, triggered }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [triggered, target]);

  // Convert to Arabic numerals
  const arabicNumerals = count.toString().replace(/\d/g, (d) =>
    String.fromCharCode(0x0660 + parseInt(d))
  );

  return (
    <span className="tabular-nums">
      {arabicNumerals}{suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[var(--navy)] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--navy)]/50 to-[var(--navy)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-wider rounded-full mb-4">
            أرقام وإنجازات
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            تأثير <span className="text-gradient-gold">ملموس</span> على أرض الواقع
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center group transition-all duration-500 ${triggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--gold)]/10 text-[var(--gold)] mb-4 group-hover:bg-[var(--gold)]/20 transition-colors duration-300">
                {stat.icon}
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-1 stat-shimmer">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} triggered={triggered} />
              </p>
              <p className="text-sm font-semibold text-white/80 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-white/40 leading-relaxed hidden sm:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
