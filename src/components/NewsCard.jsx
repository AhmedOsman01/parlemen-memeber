import Link from "next/link";
import Image from 'next/image';
import { getDirectImageUrl } from "@/lib/imageUtils";

/**
 * بطاقة الأخبار المحسّنة — تصميم premium مع تأثيرات hover متقدمة
 * تعرض صورة وتاريخ وتصنيف وعنوان ومقتطف مع تأثيرات بصرية غنية
 */
export default function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-[var(--gray-100)] transition-all duration-400 hover:border-[var(--gold)]/20 hover:shadow-[0_8px_30px_rgba(26,39,68,0.1),0_0_0_1px_rgba(201,168,76,0.08)] hover:-translate-y-1.5">

        {/* الصورة */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={getDirectImageUrl(article.image) || "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80"}
            alt={article.title || "صورة المقال"}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, 33vw"
          />

          {/* Gradient overlay — stronger on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/50 via-[var(--navy)]/10 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

          {/* Date badge — glass style */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[var(--navy)] text-[11px] font-medium rounded-lg shadow-sm border border-white/30">
            <svg className="w-3 h-3 text-[var(--gold-dark)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {formattedDate}
          </div>

          {/* Category badge */}
          {article.category && (
            <span className="absolute top-4 left-4 px-3 py-1.5 bg-[var(--gold)]/90 backdrop-blur-sm text-[var(--navy)] text-[11px] font-bold rounded-lg shadow-sm tracking-wide">
              {article.category}
            </span>
          )}

          {/* Bottom read-more overlay — slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm text-[var(--navy)] text-xs font-semibold shadow-lg">
              اقرأ المقال كاملاً
              <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* المحتوى */}
        <div className="p-6 flex flex-col flex-1">
          {/* العنوان */}
          <h3 className="text-[15px] font-bold text-[var(--navy)] mb-3 line-clamp-2 group-hover:text-[var(--gold-dark)] transition-colors duration-300 leading-[1.8]">
            {article.title}
          </h3>

          {/* المقتطف */}
          <p className="text-[13px] text-[var(--text-secondary)] leading-[1.9] line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* الخط الفاصل والقراءة */}
          <div className="mt-5 pt-4 border-t border-[var(--gray-100)] flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--gold-dark)] group-hover:gap-2.5 transition-all duration-300" style={{ fontFamily: '"Noto Kufi Arabic", ui-sans-serif, system-ui, sans-serif' }}>
              اقرأ المزيد
              <svg className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>

            {/* Reading time estimate */}
            <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ٣ دقائق قراءة
            </span>
          </div>
        </div>

        {/* Gold accent line at bottom — grows on hover */}
        <div className="h-[2px] bg-gradient-to-l from-transparent via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </article>
    </Link>
  );
}
