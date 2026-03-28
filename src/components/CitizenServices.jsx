import Link from "next/link";

/**
 * خدمات المواطنين — بطاقات وصول سريع للخدمات المتاحة
 */

const services = [
  {
    title: "تقديم شكوى",
    description: "أبلغ عن مشكلة في منطقتك أو خدمة حكومية وسنتابعها معك",
    href: "/services",
    color: "from-red-500 to-rose-600",
    bgLight: "bg-rose-50",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
    ),
  },
  {
    title: "طلب خدمة",
    description: "اطلب خدمة مساعدة أو تنسيق مع الجهات الحكومية المختلفة",
    href: "/services",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
    ),
  },
  {
    title: "طلب لقاء",
    description: "احجز موعداً لزيارة مكتب النائب أو لمقابلة شخصية",
    href: "/contact",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
    ),
  },
  {
    title: "اقتراح تشريعي",
    description: "شارك أفكارك واقتراحاتك لتطوير التشريعات والسياسات",
    href: "/contact",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
    ),
  },
];

export default function CitizenServices() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
            في خدمتكم
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] gold-underline">
            خدمات المواطنين
          </h2>
          <p className="mt-5 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            مكتب النائب في خدمتكم دائماً. اختر الخدمة المناسبة وسنتواصل معك في أقرب وقت.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href}
              className="group block bg-[var(--cream-light)] rounded-2xl p-7 border border-[var(--gray-100)] hover:border-transparent hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${service.color} bg-clip-text`}>
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--navy)] mb-2 group-hover:text-[var(--gold-dark)] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Arrow */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-dark)] group-hover:gap-2.5 transition-all duration-200">
                  ابدأ الآن
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
