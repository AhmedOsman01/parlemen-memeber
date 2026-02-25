import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import Image from 'next/image';
import { newsArticles as staticNews } from "@/data/news";
import { listSlides } from "@/models/slideModel";
import { listNews } from "@/models/newsModel";

/**
 * الصفحة الرئيسية — عرض الشرائح، المقدمة، الإحصائيات، الأنشطة البرلمانية، آخر الأخبار، وشريط الإجراء
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

      {/* ==================== المقدمة ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* الصورة */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="أحمد المصري — عضو مجلس النواب"
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {/* Gold accent bar */}
              <div className="absolute bottom-0 right-0 w-[3px] h-24 bg-gradient-to-t from-[var(--gold)] to-transparent rounded-full" />
            </div>

            {/* النص */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-md mb-5">
                عن عضو مجلس النواب
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] mb-6 leading-tight gold-underline-right">
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
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--navy)] text-white text-sm font-semibold transition-all duration-200 hover:bg-[var(--navy-light)] hover:shadow-md"
                >
                  اعرف المزيد
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--gold)] text-[var(--gold-dark)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--gold)] hover:text-[var(--navy)]"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== الإحصائيات ==================== */}
      <section className="py-16 bg-[var(--navy)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "+١٢", label: "مشروع قانون", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                )
              },
              {
                value: "٥", label: "عضوية لجان", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                )
              },
              {
                value: "+٥٠ ألف", label: "مواطن تمت خدمتهم", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                )
              },
              {
                value: "٩٨٪", label: "نسبة الحضور", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] mb-4">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[var(--gold)] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== الأنشطة البرلمانية ==================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="النشاط التشريعي"
            title="الأنشطة البرلمانية"
            subtitle="مشاريع قوانين وأسئلة برلمانية ومداخلات في الجلسات العامة واللجان."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "مشاريع القوانين",
                count: "١٢",
                desc: "مشاريع قوانين مقدمة في مجالات التعليم والصحة والاقتصاد",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                ),
              },
              {
                title: "الأسئلة البرلمانية",
                count: "٢٨",
                desc: "أسئلة موجهة للحكومة حول قضايا تهم المواطنين",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                ),
              },
              {
                title: "المداخلات",
                count: "٤٥",
                desc: "مداخلة في الجلسات العامة واللجان النوعية",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
                ),
              },
              {
                title: "اللجان",
                count: "٥",
                desc: "عضوية في لجان الاقتصاد والتعليم والبنية التحتية",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
                ),
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="bg-[var(--cream-light)] rounded-xl p-6 border border-[var(--gray-100)] hover:border-[var(--gold)]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--navy)]/5 flex items-center justify-center text-[var(--navy)] mb-5">
                  {activity.icon}
                </div>
                <p className="text-2xl font-bold text-[var(--navy)] mb-1">{activity.count}</p>
                <h3 className="text-sm font-semibold text-[var(--navy)] mb-2">{activity.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-[var(--navy)] text-[var(--navy)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--navy)] hover:text-white"
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
      <section className="py-20 bg-[var(--navy)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold accent */}
          <div className="w-12 h-[3px] bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] mx-auto mb-8 rounded-full" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            لديك سؤال أو اقتراح؟
          </h2>
          <p className="text-base text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
            صوتك مهم. تواصل معنا لمشاركة أفكارك أو مخاوفك أو ببساطة للتواصل
            مع مكتب عضو مجلس النواب.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-lg"
          >
            تواصل معنا
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
