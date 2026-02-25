import Link from "next/link";

/**
 * مكون مسار التنقل للوحة التحكم
 * يعرض مسار تنقل هرمي يبدأ بلوحة التحكم
 *
 * @param {{ items: Array<{ label: string, href?: string }> }} props
 */
export default function AdminBreadcrumb({ items = [] }) {
  return (
    <nav aria-label="مسار التنقل" className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* لوحة التحكم — دائماً أول عنصر */}
        <li>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[var(--navy)] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            لوحة التحكم
          </Link>
        </li>

        {/* عناصر إضافية */}
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-gray-300">/</span>
              {isLast || !item.href ? (
                <span className="font-semibold text-[var(--navy)]">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-[var(--navy)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
