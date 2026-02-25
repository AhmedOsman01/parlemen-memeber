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
 * شريط التنقل — شريط علوي ثابت بتصميم رسمي مؤسسي
 * يتضمن قائمة هاتف متجاوبة مع انزلاق جانبي
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

  /* منع التمرير عند فتح القائمة */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const visibleLinks = [...navLinks];
  if (isAdmin) {
    visibleLinks.push({ label: "لوحة التحكم", href: "/admin" });
  }

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-400 ${
        isAdmin ? "top-[56px]" : "top-0"
      } ${
        scrolled
          ? "glass shadow-lg py-2.5"
          : "bg-[var(--navy)]/80 backdrop-blur-sm py-4"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full relative z-20"
        aria-label="التنقل الرئيسي"
      >
        <div className="flex items-center justify-between h-full">
          {/* ---------- الشعار ---------- */}
          <div className="flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="الرئيسية"
            >
              {/* Logo mark */}
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-[var(--navy)] font-bold text-base transition-transform duration-300 group-hover:scale-105 shadow-md">
                ن
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-bold text-white leading-tight">
                  أحمد <span className="text-[var(--gold)]">المصري</span>
                </span>
                <span className="text-[10px] text-white/40 tracking-widest font-medium">
                  عضو مجلس النواب
                </span>
              </div>
            </Link>
          </div>

          {/* ---------- روابط التنقل (Desktop) ---------- */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center gap-1">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[var(--gold)]"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute bottom-0 right-4 left-4 h-[2px] bg-[var(--gold)] rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- CTA Button (Desktop) ---------- */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--gold)] text-[var(--navy)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--gold-light)] hover:shadow-md"
            >
              تواصل معنا
            </Link>
          </div>

          {/* ---------- Mobile Toggle ---------- */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center focus:outline-none"
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col items-center justify-center gap-1.5 w-5">
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? "w-5 rotate-45 translate-y-[5.5px]" : "w-5"
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-200 ${
                  mobileOpen ? "opacity-0 w-0" : "w-5"
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? "w-5 -rotate-45 -translate-y-[5.5px]" : "w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ---------- Mobile Menu Overlay ---------- */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity duration-300 z-10 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: isAdmin ? '56px' : '0' }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ---------- Mobile Menu Panel ---------- */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[280px] bg-[var(--navy-dark)] shadow-2xl transition-transform duration-300 ease-out z-20 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: isAdmin ? '56px' : '0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-base font-bold text-white">القائمة</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--gold)] bg-white/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="mr-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-white/10">
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--gold-light)]"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </header>
  );
}
