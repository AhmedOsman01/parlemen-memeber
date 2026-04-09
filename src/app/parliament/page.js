import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export const metadata = {
  title: "في البرلمان",
  description: "متابعة نشاط النائب أحمد المصري داخل مجلس النواب — مشاريع قوانين، جلسات، أسئلة برلمانية.",
};

const sessionStats = [
  { label: "جلسات حُضرت", value: "١٤٥", total: "١٤٨", pct: "٩٨٪" },
  { label: "مداخلات", value: "٨٧", total: null, pct: null },
  { label: "أسئلة برلمانية", value: "٢٣", total: null, pct: null },
  { label: "مشاريع قوانين", value: "١٢", total: null, pct: null },
];

const bills = [
  { title: "مشروع إصلاح قانون التعليم", status: "قيد الدراسة", statusColor: "bg-amber-100 text-amber-700", desc: "تعديل شامل يهدف لتحديث المناهج وتحسين جودة التعليم في جميع المراحل.", date: "فبراير ٢٠٢٥", committee: "لجنة التعليم" },
  { title: "قانون الانتخابات المحلية", status: "تم الإقرار", statusColor: "bg-green-100 text-green-700", desc: "تنظيم انتخابات المجالس المحلية بشكل يضمن تمثيلاً حقيقياً للمواطنين.", date: "يناير ٢٠٢٥", committee: "لجنة الشؤون الدستورية" },
  { title: "مشروع حماية البيئة", status: "مقدم", statusColor: "bg-blue-100 text-blue-700", desc: "تشريع جديد لمكافحة التلوث وحماية الموارد الطبيعية والمناطق الخضراء.", date: "مارس ٢٠٢٥", committee: "لجنة الطاقة والبيئة" },
  { title: "تعديل قانون العمل", status: "قيد الدراسة", statusColor: "bg-amber-100 text-amber-700", desc: "تحسين حقوق العمال وضمان بيئة عمل آمنة وعادلة.", date: "مارس ٢٠٢٥", committee: "لجنة القوى العاملة" },
];

const questions = [
  { to: "وزير الصحة", topic: "نقص الأدوية في المستشفيات الحكومية", date: "١٢ مارس ٢٠٢٥", status: "تم الرد" },
  { to: "وزير التعليم", topic: "تأخر صرف مكافآت المعلمين", date: "٢٥ فبراير ٢٠٢٥", status: "تم الرد" },
  { to: "وزير الإسكان", topic: "مشاريع الصرف الصحي المتأخرة", date: "١٠ فبراير ٢٠٢٥", status: "بانتظار الرد" },
  { to: "وزير النقل", topic: "صيانة الطرق في دائرة القاهرة ٤", date: "٢٨ يناير ٢٠٢٥", status: "تم الرد" },
  { to: "وزير التضامن", topic: "برامج الدعم للأسر الأكثر احتياجاً", date: "١٥ يناير ٢٠٢٥", status: "تم الرد" },
];

const votes = [
  { topic: "الموازنة العامة ٢٠٢٥/٢٠٢٦", position: "موافق", positionColor: "text-green-600", date: "مارس ٢٠٢٥" },
  { topic: "تعديل قانون الأحوال الشخصية", position: "موافق", positionColor: "text-green-600", date: "فبراير ٢٠٢٥" },
  { topic: "قانون الانتخابات المحلية", position: "موافق", positionColor: "text-green-600", date: "يناير ٢٠٢٥" },
  { topic: "زيادة ضريبة القيمة المضافة", position: "رافض", positionColor: "text-red-600", date: "ديسمبر ٢٠٢٤" },
  { topic: "قانون حماية البيانات الشخصية", position: "موافق", positionColor: "text-green-600", date: "نوفمبر ٢٠٢٤" },
];

const committees = [
  { name: "لجنة الشؤون الاقتصادية", role: "عضو", sessions: "٢٤ جلسة", focus: "السياسات المالية وتشجيع الاستثمار" },
  { name: "لجنة التعليم والبحث العلمي", role: "نائب رئيس", sessions: "٣٢ جلسة", focus: "إصلاح المناهج وتطوير البحث العلمي" },
  { name: "لجنة البنية التحتية والإسكان", role: "عضو", sessions: "١٨ جلسة", focus: "مشاريع البنية التحتية والإسكان الاجتماعي" },
  { name: "لجنة الصحة والسكان", role: "عضو", sessions: "٢٠ جلسة", focus: "تطوير المنظومة الصحية" },
  { name: "لجنة حقوق الإنسان", role: "عضو", sessions: "١٢ جلسة", focus: "حماية الحقوق والحريات" },
];

export default function ParliamentPage() {
  return (
    <>
      <PageHeader
        title="في البرلمان"
        subtitle="متابعة مباشرة لنشاط النائب داخل مجلس النواب — من الجلسات والتصويتات إلى مشاريع القوانين."
        breadcrumbs={[{ label: "في البرلمان" }]}
      />

      {/* ==================== Session Stats ==================== */}
      <section className="py-14 bg-white border-b border-[var(--gray-100)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {sessionStats.map((stat, i) => (
              <div key={i} className="text-center bg-[var(--cream-light)] rounded-xl p-6 border border-[var(--gray-100)]">
                <p className="text-3xl sm:text-4xl font-bold text-[var(--navy)] mb-1">{stat.value}</p>
                {stat.pct && <p className="text-xs font-bold text-[var(--gold-dark)] mb-1">{stat.pct} {stat.total ? `من ${stat.total}` : ''}</p>}
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Bills ==================== */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="العمل التشريعي"
            title="مشاريع القوانين المقدمة"
            subtitle="مشاريع القوانين التي تبناها النائب أو شارك في صياغتها."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bills.map((bill, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-[var(--gray-100)] hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bill.statusColor}`}>
                    {bill.status}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{bill.date}</span>
                </div>
                <h3 className="text-base font-bold text-[var(--navy)] mb-2 leading-[1.6]">{bill.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{bill.desc}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                  {bill.committee}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Parliamentary Questions ==================== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="رقابة برلمانية"
            title="الأسئلة البرلمانية"
            subtitle="الأسئلة الموجهة للحكومة لمتابعة قضايا المواطنين ومحاسبة الأداء."
          />

          <div className="bg-[var(--cream-light)] rounded-2xl border border-[var(--gray-100)] overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--gray-50)] text-xs font-semibold text-[var(--text-muted)] border-b border-[var(--gray-100)]">
              <div className="col-span-3">الموجه إليه</div>
              <div className="col-span-5">الموضوع</div>
              <div className="col-span-2">التاريخ</div>
              <div className="col-span-2">الحالة</div>
            </div>

            {/* Rows */}
            {questions.map((q, i) => (
              <div key={i} className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-center ${i < questions.length - 1 ? 'border-b border-[var(--gray-100)]' : ''} hover:bg-white/60 transition-colors`}>
                <div className="sm:col-span-3">
                  <span className="text-sm font-medium text-[var(--navy)]">{q.to}</span>
                </div>
                <div className="sm:col-span-5">
                  <span className="text-sm text-[var(--text-secondary)]">{q.topic}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-[var(--text-muted)]">{q.date}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${q.status === 'تم الرد' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${q.status === 'تم الرد' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    {q.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Votes ==================== */}
      <section className="py-20 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="الشفافية"
            title="التصويتات الأخيرة"
            subtitle="سجل التصويت — لأن الشفافية هي أساس الثقة."
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {votes.map((vote, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[var(--gray-100)] flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[var(--navy)] mb-1">{vote.topic}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{vote.date}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${vote.position === 'موافق' ? 'bg-green-50' : 'bg-red-50'} ${vote.positionColor}`}>
                  {vote.position === 'موافق' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                  {vote.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Committees ==================== */}
      <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="اللجان النوعية"
            title="عضوية اللجان"
            subtitle="المشاركة الفعالة في اللجان البرلمانية لصياغة التشريعات ومراقبة الأداء الحكومي."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {committees.map((com, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold">{com.role}</span>
                  <span className="text-xs text-white/30">{com.sessions}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-[1.6]">{com.name}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{com.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--navy)] mb-4 leading-[1.6]">
            لديك سؤال حول النشاط البرلماني؟
          </h2>
          <p className="text-[var(--navy)]/60 mb-6 text-sm">
            يمكنك طرح سؤالك مباشرة على النائب أو متابعة آخر الأنشطة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[var(--navy)] text-white font-semibold text-sm transition-all duration-200 hover:bg-[var(--navy-light)] hover:shadow-md"
            >
              اسأل النائب
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-[var(--navy)]/20 text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--navy)]/10"
            >
              آخر الأخبار
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
