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
      setIsAdmin(hasToken);
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
    // defer closing the mobile menu to the next tick to avoid synchronous setState in effect
    if (!mobileOpen) return;
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname, mobileOpen]);

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
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        aria-label="التنقل الرئيسي"
      >
        {/* ---------- الشعار ---------- */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="الرئيسية"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-(--gold) text-(--navy) font-bold text-lg transition-transform duration-300 group-hover:scale-110">
            نائب
          </span>
          <span className="hidden sm:block text-lg font-semibold text-white tracking-wide">
            أحمد <span className="text-(--gold)">المصري</span>
          </span>
        </Link>

        {/* ---------- روابط سطح المكتب ---------- */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "text-(--gold)"
                        : "text-white/80 hover:text-(--gold)"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 right-0 h-0.5 bg-(--gold) transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          {isAdmin && (
            <li>
              <Link
                href="/admin"
                className={`relative text-sm font-bold tracking-wider transition-colors duration-300 ${
                  pathname.startsWith("/admin") ? "text-(--gold)" : "text-white/90 hover:text-(--gold)"
                }`}
              >
                لوحة التحكم
                <span className={`absolute -bottom-1 right-0 h-0.5 bg-(--gold) transition-all duration-300 ${pathname.startsWith("/admin") ? "w-full" : "w-0"}`} />
              </Link>
            </li>
          )}
        </ul>

        {/* ---------- أزرار سطح المكتب ---------- */}
        <div className="hidden md:flex items-center gap-3">
          {!isAdmin && !pathname.startsWith("/admin") && (
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-(--gold) text-(--gold) text-sm font-semibold transition-all duration-300 hover:bg-(--gold) hover:text-(--navy) hover:shadow-lg hover:shadow-(--gold)/20"
            >
              ◆ ادارة
            </Link>
          )}
        </div>

        {/* ---------- زر القائمة (الهاتف) ---------- */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* ---------- قائمة الهاتف ---------- */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-(--navy-dark)/95 backdrop-blur-md transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
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
            {isAdmin ? (
              <Link
                href="/admin"
                className="w-full text-center px-8 py-3 rounded-full bg-(--navy-light) text-white font-semibold text-lg transition-all duration-300 hover:bg-(--navy)"
              >
                لوحة التحكم
              </Link>
            ) : !pathname.startsWith("/admin") && (
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
