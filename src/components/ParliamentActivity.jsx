/**
 * النشاط البرلماني — ملخص آخر الأنشطة في مجلس النواب
 */

const activities = [
  {
    type: "جلسة عامة",
    title: "مناقشة قانون التأمين الصحي الشامل",
    date: "١٥ مارس ٢٠٢٥",
    status: "تمت المشاركة",
    statusColor: "text-[var(--success)]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
    ),
  },
  {
    type: "سؤال برلماني",
    title: "استفسار حول خطة تطوير المدارس الحكومية",
    date: "١٢ مارس ٢٠٢٥",
    status: "تم التقديم",
    statusColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
    ),
  },
  {
    type: "مشروع قانون",
    title: "مشروع قانون دعم المشروعات الصغيرة والمتوسطة",
    date: "٨ مارس ٢٠٢٥",
    status: "قيد المناقشة",
    statusColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
    ),
  },
  {
    type: "لجنة",
    title: "اجتماع لجنة الشؤون الاقتصادية — ميزانية ٢٠٢٥",
    date: "٥ مارس ٢٠٢٥",
    status: "تمت المشاركة",
    statusColor: "text-[var(--success)]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
    ),
  },
  {
    type: "مداخلة",
    title: "مداخلة حول أزمة ارتفاع أسعار الأدوية",
    date: "١ مارس ٢٠٢٥",
    status: "تمت المداخلة",
    statusColor: "text-[var(--success)]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
    ),
  },
];

const typeColors = {
  "جلسة عامة": "bg-indigo-50 text-indigo-700",
  "سؤال برلماني": "bg-blue-50 text-blue-700",
  "مشروع قانون": "bg-amber-50 text-amber-700",
  "لجنة": "bg-emerald-50 text-emerald-700",
  "مداخلة": "bg-purple-50 text-purple-700",
};

export default function ParliamentActivity() {
  return (
    <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
            النشاط التشريعي
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] gold-underline">
            في البرلمان
          </h2>
          <p className="mt-5 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            آخر الأنشطة والمشاركات في جلسات مجلس النواب واللجان البرلمانية.
          </p>
        </div>

        {/* Activity list */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/30 to-transparent" />

            <div className="space-y-6">
              {activities.map((activity, i) => (
                <div key={i} className="relative flex items-start gap-5 group">
                  {/* Timeline dot */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-white shadow-sm border border-[var(--gray-100)] flex items-center justify-center text-[var(--navy)] shrink-0 group-hover:border-[var(--gold)]/40 group-hover:shadow-md transition-all duration-200">
                    {activity.icon}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl p-5 border border-[var(--gray-100)] group-hover:border-[var(--gold)]/20 group-hover:shadow-sm transition-all duration-200">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[activity.type] || "bg-gray-50 text-gray-700"}`}>
                        {activity.type}
                      </span>
                      <span className={`text-xs font-medium ${activity.statusColor}`}>
                        • {activity.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--navy)] mb-1 leading-relaxed">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
