import Link from "next/link";
import Image from 'next/image';
import { getDirectImageUrl } from "@/lib/imageUtils";

/**
 * بطاقة الأخبار — مكون بطاقة رسمي لعرض المقالات
 * يعرض صورة وتاريخ وتصنيف وعنوان ومقتطف
 */
export default function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-[var(--gray-100)]">
        {/* الصورة */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={getDirectImageUrl(article.image) || "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80"}
            alt={article.title || "صورة المقال"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Date badge */}
          <span className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[var(--navy)] text-xs font-medium rounded-md shadow-sm">
            {formattedDate}
          </span>

          {/* Category badge */}
          {article.category && (
            <span className="absolute top-3 left-3 px-3 py-1.5 bg-[var(--gold)] text-[var(--navy)] text-xs font-semibold rounded-md shadow-sm">
              {article.category}
            </span>
          )}
        </div>

        {/* المحتوى */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-[var(--navy)] mb-2.5 line-clamp-2 group-hover:text-[var(--gold-dark)] transition-colors duration-200 leading-relaxed">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Read more */}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gold-dark)] group-hover:gap-2.5 transition-all duration-200">
            اقرأ المزيد
            <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
