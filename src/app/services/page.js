import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

/**
 * صفحة خدمات المواطنين — نقطة وصول موحدة لجميع الخدمات
 */
export const metadata = {
  title: "خدمات المواطنين",
  description: "تقديم الشكاوى والطلبات والاقتراحات — مكتب النائب أحمد المصري في خدمتكم.",
};

const serviceCategories = [
  {
    id: "complaint",
    title: "تقديم شكوى",
    description: "أبلغ عن مشكلة في منطقتك أو خدمة حكومية",
    details: "سواء كانت مشكلة في البنية التحتية، المياه، الكهرباء، الصرف الصحي، الطرق، أو أي خدمة حكومية — أبلغنا وسنتابع مع الجهات المختصة.",
    color: "from-red-500 to-rose-600",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    stats: { solved: "٣٢٠+", avgTime: "١٤ يوم" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
    ),
  },
  {
    id: "request",
    title: "طلب خدمة",
    description: "اطلب مساعدة أو تنسيق مع جهة حكومية",
    details: "نساعدك في التنسيق مع الجهات الحكومية المختلفة: وزارة الصحة، التعليم، التضامن الاجتماعي، وغيرها.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    stats: { solved: "٢٥٠+", avgTime: "٧ أيام" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
    ),
  },
  {
    id: "suggestion",
    title: "اقتراح تشريعي",
    description: "شارك أفكارك لتطوير التشريعات",
    details: "لديك فكرة لتحسين قانون أو سياسة حكومية؟ شاركنا اقتراحك وسننقله لأروقة البرلمان.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    stats: { solved: "٤٥+", avgTime: "متابعة مستمرة" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
    ),
  },
  {
    id: "meeting",
    title: "طلب لقاء",
    description: "احجز موعداً لمقابلة النائب",
    details: "يمكنك حجز موعد لزيارة مكتب النائب أو طلب مقابلة شخصية لمناقشة قضيتك.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    stats: { solved: "١٥٠+", avgTime: "٣ أيام" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="خدمات المواطنين"
        subtitle="مكتب النائب في خدمتكم — اختر الخدمة المناسبة وتواصل معنا."
        breadcrumbs={[{ label: "خدمات المواطنين" }]}
      />

      {/* Service categories */}
      <section className="py-20 lg:py-24 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl p-8 border ${service.borderColor} hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgLight} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-[var(--navy)]">{service.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--navy)] mb-1">{service.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{service.description}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {service.details}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 mb-6 py-4 border-t border-b border-[var(--gray-50)]">
                  <div>
                    <p className="text-lg font-bold text-[var(--gold-dark)]">{service.stats.solved}</p>
                    <p className="text-xs text-[var(--text-muted)]">تم التعامل معها</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--gray-200)]" />
                  <div>
                    <p className="text-lg font-bold text-[var(--navy)]">{service.stats.avgTime}</p>
                    <p className="text-xs text-[var(--text-muted)]">متوسط وقت الاستجابة</p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l ${service.color} text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
                  style={{ fontFamily: '"Noto Kufi Arabic", ui-sans-serif, system-ui, sans-serif' }}
                >
                  {service.title}
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact form */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--navy)] mb-3 gold-underline">
              أرسل طلبك الآن
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              املأ النموذج أدناه وسنتواصل معك في أقرب وقت.
            </p>
          </div>
          <div className="bg-[var(--cream-light)] rounded-2xl p-8 border border-[var(--gray-100)]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-14 bg-[var(--navy)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "٣٢٠+", label: "مشكلة تم حلها", icon: "✓" },
              { value: "٤٨ ساعة", label: "متوسط وقت الرد", icon: "⏱" },
              { value: "٩٥٪", label: "نسبة رضا المواطنين", icon: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-[var(--gold)] mb-1">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
