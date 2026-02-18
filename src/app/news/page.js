"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";

/**
 * صفحة الأخبار — عرض بطاقات مع تصفح الصفحات
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
      <section className="relative pt-32 pb-16 bg-[var(--navy)]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=40')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            الأخبار والتحديثات
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            الأنشطة البرلمانية والتحديثات التشريعية وأخبار الدائرة.
          </p>
        </div>
      </section>

      {/* شبكة المقالات */}
      <section className="py-20 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          {/* تصفح الصفحات */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2" role="navigation" aria-label="تصفح الصفحات">
              {/* السابق */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
                aria-label="الصفحة السابقة"
              >
                السابق ←
              </button>

              {/* أرقام الصفحات */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    page === currentPage
                      ? "bg-[var(--gold)] text-[var(--navy)] shadow-md"
                      : "bg-white border border-gray-200 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
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
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
                aria-label="الصفحة التالية"
              >
                → التالي
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
