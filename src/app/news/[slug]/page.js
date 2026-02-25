import Link from "next/link";
import Image from 'next/image';
import { getDirectImageUrl } from "@/lib/imageUtils";
import { newsArticles as staticNews } from "@/data/news";
import { notFound } from "next/navigation";
import { getNewsBySlug, listNews } from "@/models/newsModel";

/**
 * توليد المعلمات الثابتة لجميع المقالات (SSG)
 */
export async function generateStaticParams() {
  const { rows } = await listNews({ limit: 100 });
  const allSlugs = [...staticNews, ...rows].map((a) => ({ slug: a.slug }));
  return allSlugs;
}

/**
 * بيانات SEO ديناميكية لكل مقال
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dbArticle = await getNewsBySlug(slug);
  const article = dbArticle || staticNews.find((a) => a.slug === slug);
  if (!article) return { title: "المقال غير موجود" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

/**
 * صفحة المقال — مسار ديناميكي /news/[slug]
 * تصميم مقال رسمي مع بيانات وصفية ومسار تنقل
 */
export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const dbArticle = await getNewsBySlug(slug);
  const article = dbArticle || staticNews.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time (Arabic average ~200 words/min)
  const wordCount = article.body ? article.body.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      {/* صورة البطل */}
      <section className="relative pt-24 pb-0">
        <div className="aspect-[21/9] max-h-[440px] w-full overflow-hidden relative">
          <Image src={getDirectImageUrl(article.image)} alt={article.title} fill className="w-full h-full object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream-light)] via-transparent to-[var(--navy)]/30" />
        </div>
      </section>

      {/* محتوى المقال */}
      <section className="py-12 lg:py-16 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="مسار التنقل" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--gold-dark)] transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="text-[var(--gray-300)]">/</span>
                <Link href="/news" className="hover:text-[var(--gold-dark)] transition-colors duration-200">
                  الأخبار
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="text-[var(--gray-300)]">/</span>
                <span className="text-[var(--navy)] font-medium truncate max-w-[200px]">{article.title}</span>
              </li>
            </ol>
          </nav>

          {/* Article metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-medium rounded-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--gray-100)] text-[var(--text-secondary)] text-xs font-medium rounded-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} دقائق قراءة
            </span>
            {article.category && (
              <span className="inline-flex items-center px-3 py-1.5 bg-[var(--navy)]/5 text-[var(--navy)] text-xs font-medium rounded-md">
                {article.category}
              </span>
            )}
          </div>

          {/* العنوان */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--navy)] mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Divider */}
          <div className="w-16 h-[2px] bg-gradient-to-l from-[var(--gold)] to-[var(--gold-dark)] mb-8 rounded-full" />

          {/* النص */}
          <div
            className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-[2]
              [&_p]:mb-6
              [&_p:first-child]:text-lg
              [&_p:first-child]:text-[var(--navy)]
              [&_p:first-child]:font-medium
              [&_p:first-child]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* مشاركة / إجراء */}
          <div className="mt-12 pt-8 border-t border-[var(--gray-200)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              شارك هذا المقال مع مجتمعك.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--gold)] text-[var(--navy)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-md"
            >
              تواصل مع النائب
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
