import Link from "next/link";

/**
 * رأس الصفحة — مكون قابل لإعادة الاستخدام لصفحات الداخلية
 * يعرض مسار التنقل والعنوان والوصف مع خلفية رسمية
 * @param {string} title — عنوان الصفحة
 * @param {string} [subtitle] — وصف اختياري
 * @param {{ label: string, href: string }[]} [breadcrumbs] — مسار التنقل
 */
export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative pt-32 pb-14 bg-[var(--navy)]" role="banner">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="مسار التنقل" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/" className="hover:text-[var(--gold)] transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/20">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[var(--gold)] transition-colors duration-200">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--gold)]">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Gold underline accent */}
        <div className="mt-6 w-16 h-[3px] rounded-full bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)]" />
      </div>
    </section>
  );
}
