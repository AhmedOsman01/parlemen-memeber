import Link from "next/link";
import Image from 'next/image';
import { newsArticles } from "@/data/news";
import { notFound } from "next/navigation";

/**
 * توليد المعلمات الثابتة لجميع المقالات (SSG)
 */
export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

/**
 * بيانات SEO ديناميكية لكل مقال
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return { title: "المقال غير موجود" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

/**
 * صفحة المقال — مسار ديناميكي /news/[slug]
 */
export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* صورة البطل */}
      <section className="relative pt-24 pb-0">
        <div className="aspect-[21/9] max-h-[480px] w-full overflow-hidden relative">
          <Image src={article.image} alt={article.title} fill className="w-full h-full object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-(--cream-light) via-transparent to-(--navy)/30" />
        </div>
      </section>

      {/* محتوى المقال */}
  <section className="py-12 lg:py-16 bg-(--cream-light)">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* رابط العودة */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-(--gold-dark) font-medium mb-8 hover:gap-3 transition-all duration-300"
          >
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            العودة إلى الأخبار
          </Link>

          {/* التاريخ */}
          <span className="inline-block px-3 py-1 bg-(--gold)/15 text-(--gold-dark) text-xs font-semibold rounded-full mb-4">
            {formattedDate}
          </span>

          {/* العنوان */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--navy) mb-8 leading-tight">
            {article.title}
          </h1>

          {/* النص */}
          <div
            className="prose prose-lg max-w-none text-(--text-secondary) leading-relaxed
              [&_p]:mb-6
              [&_p:first-child]:text-xl
              [&_p:first-child]:text-(--navy)
              [&_p:first-child]:font-medium"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* مشاركة / إجراء */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-(--text-secondary)">
              شارك هذا المقال مع مجتمعك.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-(--gold) text-(--navy) text-sm font-semibold transition-all duration-300 hover:bg-(--gold-light) hover:shadow-lg"
            >
              تواصل مع النائب
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
