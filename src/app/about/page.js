import Timeline from "@/components/Timeline";
import Image from 'next/image';
import SectionHeading from "@/components/SectionHeading";
import PageHeader from "@/components/PageHeader";
import { timelineData as staticTimeline } from "@/data/timeline";
import { listTimelineItems } from "@/models/timelineModel";
import Link from "next/link";

/**
 * بيانات SEO لصفحة عن النائب
 */
export const metadata = {
  title: "عن النائب",
  description:
    "تعرف على النائب أحمد المصري — سيرته الذاتية وإنجازاته المهنية ورؤيته والتزامه بخدمة الشعب المصري.",
};

/**
 * صفحة عن النائب — السيرة الذاتية، الإنجازات، اللجان، المسيرة المهنية، والرؤية والرسالة
 */
export default async function AboutPage() {
  const dbTimeline = await listTimelineItems();
  const timelineData = dbTimeline.length > 0 ? dbTimeline : staticTimeline;

  return (
    <>
      {/* رأس الصفحة */}
      <PageHeader
        title="عن النائب أحمد المصري"
        subtitle="مسيرة حافلة بالخدمة — من العمل المجتمعي إلى أروقة البرلمان."
        breadcrumbs={[{ label: "عن النائب" }]}
      />

      {/* ==================== السيرة الذاتية ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* الصورة — عمودين */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg relative">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                    alt="أحمد المصري — الصورة الرسمية"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                {/* بطاقة معلومات سريعة */}
                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-100)]">
                  <h3 className="text-xs font-semibold tracking-wider text-[var(--gold-dark)] mb-4 uppercase">
                    معلومات سريعة
                  </h3>
                  <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                    {[
                      { key: "المنصب", value: "عضو مجلس النواب" },
                      { key: "الدائرة", value: "القاهرة — الدائرة ٤" },
                      { key: "الحزب", value: "حزب التقدم الوطني" },
                      { key: "سنة الانتخاب", value: "٢٠٢٤" },
                      { key: "اللجان", value: "الاقتصادية، التعليم" },
                    ].map((item) => (
                      <li key={item.key} className="flex justify-between items-center py-1 border-b border-[var(--gray-50)] last:border-0">
                        <span className="font-medium text-[var(--navy)] text-xs">{item.key}</span>
                        <span className="text-xs">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* نص السيرة — ثلاثة أعمدة */}
            <div className="lg:col-span-3">
              <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-md mb-5">
                السيرة الذاتية
              </span>
              <h2 className="text-3xl font-bold text-[var(--navy)] mb-6 gold-underline-right">
                رحلة هدف وخدمة
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  وُلد أحمد المصري ونشأ في القاهرة، حيث تطور لديه شغف مبكر بالخدمة
                  العامة والمشاركة المدنية. منذ أيامه الجامعية في جامعة القاهرة، حيث
                  حصل على درجة الماجستير في العلوم السياسية بتقدير امتياز، وهو ملتزم
                  بفهم ومعالجة التحديات التي تواجه المجتمع المصري.
                </p>
                <p>
                  بدأت مسيرته في الخدمة العامة بالعمل المجتمعي، حيث شارك في تأسيس
                  منظمة غير حكومية تركز على التنمية المجتمعية والتعليم والرعاية
                  الصحية في المناطق المحرومة. منحته هذه التجربة العملية ارتباطاً عميقاً
                  باحتياجات المواطنين وشكلت نهجه في الحوكمة.
                </p>
                <p>
                  قبل دخوله البرلمان، عمل أحمد كمستشار أول للسياسات الاقتصادية، حيث
                  ساهم في صياغة الاستراتيجيات المالية الوطنية. كما ترأس لجنة البنية
                  التحتية الوطنية، مشرفاً على مشاريع كبرى بقيمة مليارات الجنيهات عبر
                  عدة محافظات.
                </p>
                <p>
                  في عام ٢٠٢٤، انتخب عضواً في مجلس النواب المصري بتفويض حاسم من
                  دائرته. منذ ذلك الحين، تبنى تشريعات في إصلاح التعليم والبنية التحتية
                  الصحية وتوظيف الشباب وحماية البيئة.
                </p>
                <p>
                  يُعرف أحمد بنهجه الشفاف والشامل في الحوكمة، وإيمانه بأن صوت كل
                  مواطن يستحق أن يُسمع في أروقة البرلمان.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== الإنجازات الرئيسية ==================== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="إنجازات بارزة"
            title="أبرز الإنجازات"
            subtitle="محطات رئيسية في مسيرة خدمة المواطنين والعمل التشريعي."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "إصلاح قانون التعليم",
                desc: "قاد جهود تعديل قانون التعليم لضمان جودة أفضل ومساواة في الفرص التعليمية لجميع المحافظات.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
                ),
              },
              {
                title: "مبادرة الرعاية الصحية",
                desc: "أطلق مبادرة لتحسين خدمات الرعاية الصحية الأولية في المناطق الريفية، مستفيداً من الشراكات مع القطاع الخاص.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                ),
              },
              {
                title: "برنامج توظيف الشباب",
                desc: "ساهم في تأسيس برنامج تدريب وتوظيف استفاد منه أكثر من ٥,٠٠٠ شاب وشابة في الدائرة.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
                ),
              },
            ].map((achievement, i) => (
              <div key={i} className="bg-[var(--cream-light)] rounded-xl p-7 border border-[var(--gray-100)]">
                <div className="w-12 h-12 rounded-lg bg-[var(--navy)]/5 flex items-center justify-center text-[var(--navy)] mb-5">
                  {achievement.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--navy)] mb-2">{achievement.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== عضوية اللجان ==================== */}
      <section className="py-16 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="العمل البرلماني"
            title="عضوية اللجان"
            subtitle="المشاركة الفعالة في اللجان النوعية لمجلس النواب."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { name: "لجنة الشؤون الاقتصادية", role: "عضو" },
              { name: "لجنة التعليم والبحث العلمي", role: "نائب رئيس" },
              { name: "لجنة البنية التحتية والإسكان", role: "عضو" },
              { name: "لجنة الصحة والسكان", role: "عضو" },
              { name: "لجنة حقوق الإنسان", role: "عضو" },
            ].map((committee, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-[var(--gray-100)] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--navy)]">{committee.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{committee.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== الرؤية والرسالة ==================== */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* الرؤية */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <div className="w-11 h-11 rounded-lg bg-[var(--gold)]/15 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">رؤيتنا</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                مصر مزدهرة وعادلة يحصل فيها كل مواطن على تعليم جيد ورعاية صحية
                وفرص اقتصادية — أمة تقود المنطقة من خلال الابتكار والشفافية
                والحوكمة الشاملة.
              </p>
            </div>

            {/* الرسالة */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <div className="w-11 h-11 rounded-lg bg-[var(--gold)]/15 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">رسالتنا</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                تمثيل الشعب بنزاهة وتبني تشريعات تحويلية وتقديم تحسينات ملموسة
                للمجتمعات في جميع أنحاء الدائرة — من خلال التعاون والمساءلة والالتزام
                الراسخ بالخدمة العامة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== المسيرة المهنية ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="محطات بارزة"
            title="المسيرة المهنية"
            subtitle="محطات رئيسية وإنجازات عبر مسيرة مكرسة لخدمة الوطن."
          />
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* شريط الإجراء */}
      <section className="py-14 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--navy)] mb-4">
            هل ترغب في التواصل؟
          </h2>
          <p className="text-[var(--navy)]/60 mb-6 text-sm">
            لديك أسئلة أو أفكار أو ترغب في التواصل؟ تواصل معنا مباشرة.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[var(--navy)] text-white font-semibold text-sm transition-all duration-200 hover:bg-[var(--navy-light)] hover:shadow-md"
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
