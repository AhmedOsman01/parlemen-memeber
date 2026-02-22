import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import Image from 'next/image';
import { newsArticles as staticNews } from "@/data/news";
import { listSlides } from "@/models/slideModel";
import { listNews } from "@/models/newsModel";

/**
 * الصفحة الرئيسية — عرض الشرائح، المقدمة، الإحصائيات، آخر الأخبار، وشريط الإجراء
 */
export default async function HomePage() {
  const slidesData = await listSlides();
  const { rows: dbNews } = await listNews({ limit: 3 });

  const latestNews = dbNews.length > 0 ? dbNews : staticNews.slice(0, 3);

  return (
    <>
      {/* ==================== العرض الرئيسي ==================== */}
      <HeroSlider initialSlides={slidesData} />

      {/* ==================== المقدمة ==================== */}
      <section className="py-20 lg:py-28 bg-(--cream-light)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* الصورة */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="أحمد المصري — عضو مجلس النواب"
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {/* عنصر زخرفي */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-(--gold)/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-(--navy)/10 rounded-2xl -z-10" />
            </div>

            {/* النص */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-(--gold)/15 text-(--gold-dark) text-xs font-semibold tracking-wider rounded-full mb-4">
                عن عضو مجلس النواب
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-(--navy) mb-6 leading-tight gold-underline-right">
                خدمة مصر بإخلاص ورؤية ثاقبة
              </h2>
              <p className="text-(--text-secondary) leading-relaxed mb-4">
                أحمد المصري هو خادم عام ملتزم وعضو في مجلس النواب المصري، يمثل
                المواطنين بنزاهة وعزيمة. بخبرة سنوات في تطوير السياسات وخدمة
                المجتمع، تبنى تشريعات في التعليم والرعاية الصحية والإصلاح الاقتصادي.
              </p>
              <p className="text-(--text-secondary) leading-relaxed mb-8">
                مهمته هي بناء مصر أكثر عدالة وازدهاراً — مع ضمان أن أصوات جميع
                المواطنين مسموعة في أروقة البرلمان.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-(--navy) text-white text-sm font-semibold transition-all duration-300 hover:bg-(--navy-light) hover:shadow-lg"
                >
                  اعرف المزيد
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-(--gold) text-(--gold-dark) text-sm font-semibold transition-all duration-300 hover:bg-(--gold) hover:text-(--navy)"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== الإحصائيات ==================== */}
      <section className="py-16 bg-(--navy)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "+١٢", label: "مشروع قانون" },
              { value: "٥", label: "عضوية لجان" },
              { value: "+٥٠ ألف", label: "مواطن تمت خدمتهم" },
              { value: "٩٨٪", label: "نسبة الحضور" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl sm:text-4xl font-bold text-(--gold) mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== آخر الأخبار ==================== */}
      <section className="py-20 lg:py-28 bg-(--cream-light)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="آخر الأخبار"
            subtitle="تابع أحدث الأنشطة البرلمانية والمبادرات المجتمعية والتحديثات التشريعية."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-(--navy) text-(--navy) text-sm font-semibold transition-all duration-300 hover:bg-(--navy) hover:text-white"
            >
              عرض جميع الأخبار
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== شريط الإجراء ==================== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-(--navy-dark) to-(--navy)" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1920&q=40')", backgroundSize: "cover", backgroundPosition: "center" }} />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            لديك سؤال أو اقتراح؟
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            صوتك مهم. تواصل معنا لمشاركة أفكارك أو مخاوفك أو ببساطة للتواصل
            مع مكتب عضو مجلس النواب.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-(--gold) text-(--navy) font-semibold text-base transition-all duration-300 hover:bg-(--gold-light) hover:shadow-xl hover:shadow-(--gold)/30 hover:scale-105"
          >
            تواصل معنا
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
