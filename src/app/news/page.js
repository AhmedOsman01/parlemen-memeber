"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import PageHeader from "@/components/PageHeader";

/**
 * صفحة الأخبار — عرض بطاقات مع تصفح الصفحات وهياكل تحميل
 */

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (mounted) setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        if (mounted) setArticles([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE) || 1;
  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);

  return (
    <>
      {/* رأس الصفحة */}
      <PageHeader
        title="الأخبار والتحديثات"
        subtitle="الأنشطة البرلمانية والتحديثات التشريعية وأخبار الدائرة."
        breadcrumbs={[{ label: "الأخبار" }]}
      />

      {/* شبكة المقالات */}
      <section className="py-20 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--gray-100)] animate-pulse">
                  <div className="aspect-[16/10] bg-[var(--gray-100)]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[var(--gray-100)] rounded w-3/4" />
                    <div className="h-3 bg-[var(--gray-100)] rounded w-full" />
                    <div className="h-3 bg-[var(--gray-100)] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && articles.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-[var(--gray-300)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <p className="text-[var(--text-secondary)] text-base">لا توجد أخبار حالياً.</p>
              <p className="text-[var(--text-muted)] text-sm mt-1">تابعنا للمستجدات القادمة.</p>
            </div>
          )}

          {/* Articles grid */}
          {!loading && articles.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article) => (
                  <NewsCard key={article.slug} article={article} />
                ))}
              </div>

              {/* تصفح الصفحات */}
              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2" role="navigation" aria-label="تصفح الصفحات">
                  {/* السابق */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-[var(--gray-200)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)]"
                    aria-label="الصفحة السابقة"
                  >
                    السابق ←
                  </button>

                  {/* أرقام الصفحات */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${page === currentPage
                          ? "bg-[var(--navy)] text-white shadow-sm"
                          : "bg-white border border-[var(--gray-200)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)]"
                        }`}
                      aria-label={`صفحة ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}

                  {/* التالي */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-[var(--gray-200)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)]"
                    aria-label="الصفحة التالية"
                  >
                    → التالي
                  </button>
                </div>
              )}

              {/* Page indicator */}
              {totalPages > 1 && (
                <p className="text-center text-xs text-[var(--text-muted)] mt-4">
                  صفحة {currentPage} من {totalPages}
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
