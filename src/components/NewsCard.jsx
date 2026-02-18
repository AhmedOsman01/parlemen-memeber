import Link from "next/link";
import Image from 'next/image';

/**
 * بطاقة الأخبار — مكون بطاقة لصفحة الأخبار
 * يعرض صورة وتاريخ وعنوان ومقتطف مع حركة عند التمرير
 */
export default function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-md card-hover h-full flex flex-col">
        {/* الصورة */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          {/* شارة التاريخ */}
          <span className="absolute top-4 right-4 px-3 py-1 bg-[var(--gold)] text-[var(--navy)] text-xs font-semibold rounded-full shadow-md">
            {formattedDate}
          </span>
        </div>

        {/* المحتوى */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[var(--navy)] mb-3 line-clamp-2 group-hover:text-[var(--gold-dark)] transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--gold-dark)] group-hover:gap-2 transition-all duration-300">
            اقرأ المزيد
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
