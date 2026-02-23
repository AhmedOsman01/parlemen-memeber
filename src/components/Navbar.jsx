"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * روابط التنقل المستخدمة في قائمة سطح المكتب والهاتف
 */
const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الأخبار", href: "/news" },
  { label: "عن النائب", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

/**
 * شريط التنقل — شريط علوي ثابت بتأثير الزجاج عند التمرير
 * يتضمن قائمة هاتف متجاوبة مع حركات انزلاق سلسة
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /* التحقق من حالة المسؤول عبر ملفات تعريف الارتباط */
  useEffect(() => {
    const checkAdmin = () => {
      const hasToken = document.cookie.split(';').some(c => c.trim().startsWith('admin_jwt='));
      queueMicrotask(() => setIsAdmin(hasToken));
    };
    checkAdmin();
    // Re-check periodically or on focus if needed, but for now simple check is fine
  }, [pathname]);

  /* الاستماع للتمرير لتبديل خلفية الزجاج */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* إغلاق قائمة الهاتف عند تغيير المسار */
  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  // Combine regular links with admin link if authenticated
  const visibleLinks = [...navLinks];
  if (isAdmin) {
    visibleLinks.push({ label: "لوحة التحكم", href: "/admin" });
  }

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-500 ${
        isAdmin ? "top-[56px]" : "top-0"
      } ${
        scrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full relative z-20"
        aria-label="التنقل الرئيسي"
      >
        <div className="flex items-center justify-between md:grid md:grid-cols-3 h-full">
          {/* ---------- الشعار (RTL: Right side) ---------- */}
          <div className="flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="الرئيسية"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-(--gold) to-(--gold-dark) text-(--navy) font-bold text-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-(--gold)/20">
                نائب
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-white leading-tight tracking-tight">
                  أحمد <span className="text-(--gold)">المصري</span>
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium">عضو مجلس النواب</span>
              </div>
            </Link>
          </div>

          {/* ---------- روابط المركز (Desktop only) ---------- */}
          <div className="hidden md:flex justify-center">
            <ul className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10 shadow-xl overflow-hidden">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 relative group/item overflow-hidden ${
                        isActive
                          ? "text-(--navy) bg-(--gold)"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- أزرار اليسار (Desktop: Action / Mobile: Toggle) ---------- */}
          <div className="flex items-center justify-end gap-4">
            {/* Desktop Action */}
            <div className="hidden md:flex items-center gap-3">
              {!isAdmin && !pathname.startsWith("/admin") && (
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/20 text-white text-sm font-bold transition-all duration-500 hover:bg-(--gold) hover:text-(--navy) hover:border-(--gold) hover:shadow-xl hover:shadow-(--gold)/20"
                >
                  <span className="text-(--gold) group-hover:text-(--navy)">◆</span>
                  ادارة
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none"
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col items-center justify-center gap-1.5 w-6">
                <span
                  className={`block h-0.5 bg-white transition-all duration-500 ease-in-out ${
                    mobileOpen ? "w-6 rotate-45 translate-y-2" : "w-6 group-hover:w-4"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    mobileOpen ? "opacity-0" : "w-6"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-all duration-500 ease-in-out ${
                    mobileOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6 group-hover:w-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- قائمة الهاتف ---------- */}
      <div
        className={`md:hidden fixed inset-0 bg-(--navy-dark)/95 backdrop-blur-md transition-all duration-500 z-10 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: isAdmin ? '56px' : '0' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {visibleLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? "text-(--gold)" : "text-white/80 hover:text-(--gold)"
                }`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-4 mt-4 w-full px-8">
            <Link
              href="/contact"
              className="w-full text-center px-8 py-3 rounded-full bg-(--gold) text-(--navy) font-semibold text-lg transition-all duration-300 hover:bg-(--gold-light)"
            >
              تواصل معنا
            </Link>
            {!isAdmin && !pathname.startsWith("/admin") && (
              <Link
                href="/admin/login"
                className="w-full text-center px-8 py-3 rounded-full border-2 border-(--gold) text-(--gold) font-semibold text-lg transition-all duration-300 hover:bg-(--gold) hover:text-(--navy)"
              >
                ◆ ادارة
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
