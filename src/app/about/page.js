import Timeline from "@/components/Timeline";
import Image from 'next/image';
import SectionHeading from "@/components/SectionHeading";
import { timelineData } from "@/data/timeline";
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
 * صفحة عن النائب — السيرة الذاتية، المسيرة المهنية، والرؤية والرسالة
 */
export default function AboutPage() {
  return (
    <>
      {/* رأس الصفحة */}
      <section className="relative pt-32 pb-16 bg-[var(--navy)]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&q=40')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            عن النائب أحمد المصري
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            مسيرة حافلة بالخدمة — من العمل المجتمعي إلى أروقة البرلمان.
          </p>
        </div>
      </section>

      {/* ==================== السيرة الذاتية ==================== */}
      <section className="py-20 lg:py-28 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* الصورة — عمودين */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                    alt="أحمد المصري — الصورة الرسمية"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                {/* بطاقة معلومات سريعة */}
                <div className="mt-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-sm font-semibold tracking-wider text-[var(--gold-dark)] mb-4">
                    معلومات سريعة
                  </h3>
                  <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <li className="flex justify-between">
                      <span className="font-medium text-[var(--navy)]">المنصب</span>
                      <span>عضو مجلس النواب</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-[var(--navy)]">الدائرة</span>
                      <span>القاهرة — الدائرة ٤</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-[var(--navy)]">الحزب</span>
                      <span>حزب التقدم الوطني</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-[var(--navy)]">سنة الانتخاب</span>
                      <span>٢٠٢٤</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-[var(--navy)]">اللجان</span>
                      <span>الاقتصادية، التعليم</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* نص السيرة — ثلاثة أعمدة */}
            <div className="lg:col-span-3">
              <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/15 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
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

      {/* ==================== الرؤية والرسالة ==================== */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* الرؤية */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">رؤيتنا</h3>
              <p className="text-white/60 leading-relaxed">
                مصر مزدهرة وعادلة يحصل فيها كل مواطن على تعليم جيد ورعاية صحية
                وفرص اقتصادية — أمة تقود المنطقة من خلال الابتكار والشفافية
                والحوكمة الشاملة.
              </p>
            </div>

            {/* الرسالة */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">رسالتنا</h3>
              <p className="text-white/60 leading-relaxed">
                تمثيل الشعب بنزاهة وتبني تشريعات تحويلية وتقديم تحسينات ملموسة
                للمجتمعات في جميع أنحاء الدائرة — من خلال التعاون والمساءلة والالتزام
                الراسخ بالخدمة العامة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== المسيرة المهنية ==================== */}
      <section className="py-20 lg:py-28 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="المسيرة المهنية"
            subtitle="محطات رئيسية وإنجازات عبر مسيرة مكرسة لخدمة الوطن."
          />
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* شريط الإجراء */}
      <section className="py-16 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--navy)] mb-4">
            هل ترغب في التواصل؟
          </h2>
          <p className="text-[var(--navy)]/70 mb-6">
            لديك أسئلة أو أفكار أو ترغب في التواصل؟ تواصل معنا مباشرة.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--navy)] text-white font-semibold text-sm transition-all duration-300 hover:bg-[var(--navy-light)] hover:shadow-xl hover:scale-105"
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
