"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogout from "@/components/AdminLogout";

const adminLinks = [
  { label: "لوحة التحكم", href: "/admin", icon: "🏠" },
  { label: "الأخبار", href: "/admin/news", icon: "📰" },
  { label: "السلايدر", href: "/admin/slides", icon: "🖼️" },
  { label: "الجدول الزمني", href: "/admin/timeline", icon: "⏳" },
  { label: "الرسائل", href: "/admin/contacts", icon: "✉️" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin token on every path change
  useEffect(() => {
    const hasToken = document.cookie.split(';').some(c => c.trim().startsWith('admin_jwt='));
    queueMicrotask(() => {
      setIsAdmin(hasToken);
    });
  }, [pathname]);

  // Don't show admin nav on login page or if not logged in
  if (pathname === "/admin/login" || !isAdmin) return null;

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 w-full z-[60] h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-3 items-center h-full">
          {/* Label (Right) */}
          <div className="flex justify-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden lg:block border-l pl-4 ml-2">إدارة الموقع:</span>
          </div>

          {/* Links (Center) */}
          <div className="flex justify-center h-full gap-1 items-center overflow-x-auto no-scrollbar px-2">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gold/10 text-navy"
                      : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                  }`}
                  title={link.label}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout (Left) */}
          <div className="flex justify-end pr-4 border-r border-gray-100">
             <AdminLogout />
          </div>
        </div>
      </div>
    </div>
  );
}
