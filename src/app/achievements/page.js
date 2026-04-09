import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export const metadata = {
  title: "الإنجازات",
  description: "إنجازات النائب أحمد المصري — مشاريع قوانين، مبادرات مجتمعية، ومشاكل تم حلها.",
};

const impactStats = [
  { value: "١٢", label: "مشروع قانون", icon: "📜" },
  { value: "٣٢٠+", label: "مشكلة تم حلها", icon: "✅" },
  { value: "٨", label: "مبادرة مجتمعية", icon: "🤝" },
  { value: "١٥٠+", label: "لقاء مجتمعي", icon: "🎤" },
];

const categories = [
  {
    id: "health",
    name: "الصحة",
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    ),
    achievements: [
      { title: "مبادرة الرعاية الصحية الأولية", desc: "إنشاء ٥ مراكز صحية جديدة في المناطق المحرومة بالدائرة مع تجهيزات طبية حديثة.", impact: "٥٠,٠٠٠ مستفيد", date: "٢٠٢٥" },
      { title: "حملة الكشف المبكر", desc: "تنظيم حملات كشف مبكر عن أمراض القلب والسكري بالتعاون مع وزارة الصحة.", impact: "١٢,٠٠٠ فحص", date: "٢٠٢٤" },
    ],
  },
  {
    id: "education",
    name: "التعليم",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
    ),
    achievements: [
      { title: "إصلاح قانون التعليم", desc: "قيادة مشروع تعديل قانون التعليم لضمان جودة أفضل ومساواة في الفرص التعليمية.", impact: "يؤثر على ٢٠ مليون طالب", date: "٢٠٢٥" },
      { title: "منح تعليمية للمتفوقين", desc: "تأسيس صندوق منح دراسية لدعم ١٠٠ طالب متفوق سنوياً من أبناء الدائرة.", impact: "٣٠٠ منحة حتى الآن", date: "٢٠٢٤" },
    ],
  },
  {
    id: "infrastructure",
    name: "البنية التحتية",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
    ),
    achievements: [
      { title: "رصف وإنارة الشوارع", desc: "رصف ١٥ كم من الطرق وتركيب ٨٠٠ عمود إنارة في المناطق المحرومة.", impact: "٣٥ منطقة", date: "٢٠٢٥" },
      { title: "مشروع الصرف الصحي", desc: "استكمال شبكة الصرف الصحي في ١٢ قرية لم تكن مخدومة سابقاً.", impact: "٢٠,٠٠٠ أسرة", date: "٢٠٢٤" },
    ],
  },
  {
    id: "employment",
    name: "التوظيف",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
    ),
    achievements: [
      { title: "برنامج توظيف الشباب", desc: "تدريب وتوظيف أكثر من ١٠,٠٠٠ شاب وشابة بالتعاون مع القطاع الخاص.", impact: "١٠,٠٠٠ فرصة عمل", date: "مستمر" },
      { title: "ملتقى التوظيف السنوي", desc: "تنظيم ملتقى سنوي يجمع ٥٠ شركة مع الباحثين عن عمل من أبناء الدائرة.", impact: "٣ دورات ناجحة", date: "سنوي" },
    ],
  },
];

const milestones = [
  { year: "٢٠٢٤", title: "الانتخاب لعضوية مجلس النواب", desc: "فوز بتفويض شعبي كاسح في دائرة القاهرة ٤." },
  { year: "٢٠٢٤", title: "عضوية لجنة التعليم والبحث العلمي", desc: "تعيين نائب رئيس للجنة التعليم والبحث العلمي." },
  { year: "٢٠٢٤", title: "إطلاق مبادرة الكشف الصحي", desc: "قيادة أول حملة صحية شاملة في الدائرة." },
  { year: "٢٠٢٥", title: "تقديم مشروع إصلاح التعليم", desc: "أول مشروع قانون مقدم لإصلاح منظومة التعليم." },
  { year: "٢٠٢٥", title: "حل ٣٠٠+ مشكلة مواطنين", desc: "الوصول لعلامة ٣٠٠ مشكلة تم حلها في الدائرة." },
  { year: "٢٠٢٥", title: "مبادرة البنية التحتية", desc: "إطلاق أكبر مشروع رصف وإنارة في تاريخ الدائرة." },
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        title="الإنجازات والمبادرات"
        subtitle="سجل حافل بالإنجازات الملموسة في خدمة المواطنين والعمل التشريعي."
        breadcrumbs={[{ label: "الإنجازات" }]}
      />

      {/* ==================== Impact Stats ==================== */}
      <section className="py-14 bg-white border-b border-[var(--gray-100)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-[var(--navy)] mb-1">{stat.value}</p>
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Categorized Achievements ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="إنجازات ملموسة"
            title="الإنجازات حسب المجال"
            subtitle="نعمل على جبهات متعددة لتحقيق تنمية شاملة ومستدامة."
          />

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-2xl overflow-hidden border border-[var(--gray-100)] shadow-sm">
                {/* Category header */}
                <div className={`bg-gradient-to-l ${cat.color} px-8 py-5 flex items-center gap-4`}>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                    <p className="text-white/70 text-xs">{cat.achievements.length} إنجازات مسجلة</p>
                  </div>
                </div>

                {/* Achievement cards */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cat.achievements.map((achievement, i) => (
                    <div key={i} className={`${cat.bg} rounded-xl p-6 border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-300`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[var(--text-muted)] bg-white px-3 py-1 rounded-full">{achievement.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-[var(--navy)] mb-2">{achievement.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{achievement.desc}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        <span className="font-semibold text-[var(--gold-dark)]">{achievement.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Timeline ==================== */}
      <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="المسيرة"
            title="محطات بارزة"
            subtitle="أهم المحطات في مسيرة العمل البرلماني والخدمة المجتمعية."
            light
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-6 w-[2px] bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/40 to-transparent" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="relative flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--gold)]/15 border-2 border-[var(--gold)]/40 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[var(--gold)]" />
                  </div>
                  {/* Content */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 flex-1">
                    <span className="text-xs font-bold text-[var(--gold)] mb-1 block">{milestone.year}</span>
                    <h4 className="text-base font-bold text-white mb-1">{milestone.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--navy)] mb-4 leading-[1.6]">
            شارك في صنع الإنجازات
          </h2>
          <p className="text-[var(--navy)]/60 mb-6 text-sm">
            لديك فكرة أو اقتراح لمشروع جديد؟ شاركنا رأيك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[var(--navy)] text-white font-semibold text-sm transition-all duration-200 hover:bg-[var(--navy-light)] hover:shadow-md"
            >
              خدمات المواطنين
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-[var(--navy)]/20 text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--navy)]/10"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
