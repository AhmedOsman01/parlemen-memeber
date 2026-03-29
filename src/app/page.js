import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import ImpactMetrics from "@/components/ImpactMetrics";
import CitizenServices from "@/components/CitizenServices";
import Testimonials from "@/components/Testimonials";
import SolvedProblems from "@/components/SolvedProblems";
import AskMP from "@/components/AskMP";
import ParliamentActivity from "@/components/ParliamentActivity";
import Link from "next/link";
import Image from 'next/image';
import { newsArticles as staticNews } from "@/data/news";
import { listSlides } from "@/models/slideModel";
import { listNews } from "@/models/newsModel";

/**
 * الصفحة الرئيسية — منصة تأثير سياسي شاملة
 * تتضمن: العرض الرئيسي، المقدمة، الإحصائيات المتحركة، خدمات المواطنين،
 * الأنشطة البرلمانية، مشاكل تم حلها، شهادات المواطنين، اسأل النائب، آخر الأخبار
 */
export default async function HomePage() {
  const slidesData = JSON.parse(JSON.stringify(await listSlides()));
  const { rows: dbNews } = await listNews({ limit: 3 });

  const latestNews = dbNews.length > 0 ? dbNews : staticNews.slice(0, 3);
  const serializedNews = JSON.parse(JSON.stringify(latestNews));

  return (
    <>
      {/* ==================== العرض الرئيسي ==================== */}
      <HeroSlider initialSlides={slidesData} />

      {/* ==================== المقدمة بعن النائب ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* الصورة */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl relative group">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="أحمد المصري — عضو مجلس النواب"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 to-transparent" />
              </div>
              {/* Gold accent decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[var(--gold)]/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[var(--gold)]/10 rounded-xl -z-10" />
              {/* Floating stat badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-[var(--gray-100)]">
                <p className="text-2xl font-bold text-[var(--gold-dark)]">+٥٠ ألف</p>
                <p className="text-xs text-[var(--text-secondary)]">مواطن تمت خدمتهم</p>
              </div>
            </div>

            {/* النص */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-md mb-5">
                عن عضو مجلس النواب
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] mb-6 leading-[1.6] gold-underline-right">
                خدمة مصر بإخلاص ورؤية ثاقبة
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                أحمد المصري هو خادم عام ملتزم وعضو في مجلس النواب المصري، يمثل
                المواطنين بنزاهة وعزيمة. بخبرة سنوات في تطوير السياسات وخدمة
                المجتمع، تبنى تشريعات في التعليم والرعاية الصحية والإصلاح الاقتصادي.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                مهمته هي بناء مصر أكثر عدالة وازدهاراً — مع ضمان أن أصوات جميع
                المواطنين مسموعة في أروقة البرلمان.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "الدائرة", value: "القاهرة — الدائرة ٤" },
                  { label: "سنة الانتخاب", value: "٢٠٢٤" },
                  { label: "اللجان", value: "٥ لجان نوعية" },
                  { label: "الحضور", value: "٩٨٪" },
                ].map((fact, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    <span className="text-[var(--text-muted)]">{fact.label}:</span>
                    <span className="font-semibold text-[var(--navy)]">{fact.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--navy)] text-white text-sm font-semibold transition-all duration-200 hover:bg-[var(--navy-light)] hover:shadow-lg hover:-translate-y-0.5"
                >
                  اعرف المزيد
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--gold)] text-[var(--gold-dark)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--gold)] hover:text-[var(--navy)] hover:-translate-y-0.5"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== الإحصائيات المتحركة ==================== */}
      <ImpactMetrics />

      {/* ==================== خدمات المواطنين ==================== */}
      <CitizenServices />

      {/* ==================== الأنشطة البرلمانية ==================== */}
      <ParliamentActivity />

      {/* ==================== مشاكل تم حلها ==================== */}
      <SolvedProblems />

      {/* ==================== شهادات المواطنين ==================== */}
      <Testimonials />

      {/* ==================== اسأل النائب ==================== */}
      <AskMP />

      {/* ==================== آخر الأخبار ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="آخر المستجدات"
            title="آخر الأخبار"
            subtitle="تابع أحدث الأنشطة البرلمانية والمبادرات المجتمعية والتحديثات التشريعية."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serializedNews.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-[var(--navy)] text-[var(--navy)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--navy)] hover:text-white hover:-translate-y-0.5"
            >
              عرض جميع الأخبار
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== شريط الإجراء النهائي ==================== */}
      <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="absolute top-0 left-0 right-0 section-divider-gold" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold accent */}
          <div className="w-12 h-[3px] bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] mx-auto mb-8 rounded-full" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            لديك سؤال أو اقتراح؟
          </h2>
          <p className="text-base text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
            صوتك مهم. تواصل معنا لمشاركة أفكارك أو مخاوفك أو ببساطة للتواصل
            مع مكتب عضو مجلس النواب.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-lg hover:-translate-y-0.5"
            >
              تواصل معنا
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
            >
              خدمات المواطنين
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
