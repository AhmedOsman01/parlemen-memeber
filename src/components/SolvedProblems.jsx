"use client";

/**
 * مشاكل تم حلها — عرض بطاقات لمشاكل واقعية تم حلها بواسطة مكتب النائب
 */

const solvedProblems = [
  {
    title: "إصلاح شبكة الصرف الصحي — حي المعادي",
    category: "بنية تحتية",
    date: "فبراير ٢٠٢٥",
    impact: "١٢,٠٠٠ مواطن مستفيد",
    description: "تم التنسيق مع محافظة القاهرة لإصلاح شبكة الصرف الصحي المتهالكة في ٣ شوارع رئيسية.",
    status: "solved",
  },
  {
    title: "إنشاء وحدة صحية — حلوان",
    category: "صحة",
    date: "يناير ٢٠٢٥",
    impact: "٨,٠٠٠ مواطن مستفيد",
    description: "تم إنشاء وحدة صحية مجهزة بالكامل في المنطقة التي كانت تفتقر لأقرب خدمة صحية.",
    status: "solved",
  },
  {
    title: "تحسين البنية التحتية للطرق — شبرا",
    category: "بنية تحتية",
    date: "ديسمبر ٢٠٢٤",
    impact: "١٥,٠٠٠ مواطن مستفيد",
    description: "رصف وتطوير ٥ شوارع رئيسية كانت تعاني من تدهور شديد يعيق حركة المرور.",
    status: "solved",
  },
  {
    title: "توفير أجهزة طبية — مستشفى المنيرة",
    category: "صحة",
    date: "نوفمبر ٢٠٢٤",
    impact: "٢٠,٠٠٠ مواطن مستفيد",
    description: "تم توفير أجهزة أشعة وتحاليل حديثة للمستشفى بالتنسيق مع وزارة الصحة.",
    status: "solved",
  },
  {
    title: "برنامج توظيف الشباب — مدينة نصر",
    category: "توظيف",
    date: "أكتوبر ٢٠٢٤",
    impact: "٥,٠٠٠ شاب مستفيد",
    description: "إطلاق برنامج تدريب وتوظيف بالشراكة مع القطاع الخاص وفّر فرص عمل حقيقية.",
    status: "solved",
  },
  {
    title: "حل أزمة المياه — حي التبين",
    category: "خدمات",
    date: "سبتمبر ٢٠٢٤",
    impact: "٧,٠٠٠ مواطن مستفيد",
    description: "تم إصلاح خطوط المياه الرئيسية وتركيب محطة ضخ جديدة لحل انقطاع المياه المتكرر.",
    status: "solved",
  },
];

const categoryColors = {
  "بنية تحتية": "bg-blue-50 text-blue-700",
  "صحة": "bg-rose-50 text-rose-700",
  "توظيف": "bg-purple-50 text-purple-700",
  "خدمات": "bg-teal-50 text-teal-700",
};

export default function SolvedProblems() {
  return (
    <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
            خدمة المواطنين
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] gold-underline">
            مشاكل تم حلها
          </h2>
          <p className="mt-5 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            إنجازات ملموسة في خدمة المواطنين — من حل مشاكل البنية التحتية إلى تحسين الخدمات الصحية والتعليمية.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solvedProblems.map((problem, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-[var(--gray-100)] card-gold-hover group"
            >
              {/* Top row: category + status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[problem.category] || "bg-gray-50 text-gray-700"}`}>
                  {problem.category}
                </span>
                <span className="badge-solved">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  تم الحل
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-[var(--navy)] mb-2 leading-relaxed">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {problem.description}
              </p>

              {/* Footer: date + impact */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--gray-50)]">
                <span className="text-xs text-[var(--text-muted)]">{problem.date}</span>
                <span className="text-xs font-semibold text-[var(--navy)] flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                  {problem.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
