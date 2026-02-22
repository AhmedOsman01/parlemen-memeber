"use client";

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

  // Don't show admin nav on login page
  if (pathname === "/admin/login") return null;

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-[72px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar py-2">
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
                >
                  <span>{link.icon}</span>
                  <span className="hidden xs:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="shrink-0 border-r border-gray-100 pr-4 mr-2 sm:mr-4">
             <AdminLogout />
          </div>
        </div>
      </div>
    </div>
  );
}
