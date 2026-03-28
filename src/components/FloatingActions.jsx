"use client";

import { useState } from "react";

/**
 * الأزرار العائمة — أزرار وصول سريع للخدمات الأهم
 * تشمل: تواصل مباشر، تقديم شكوى، واتساب
 */
export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      label: "تواصل الآن",
      href: "/contact",
      bg: "bg-[var(--navy)]",
      text: "text-white",
      tooltipBg: "bg-[var(--navy)] text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      ),
    },
    {
      label: "قدم شكوى",
      href: "/services",
      bg: "bg-[var(--egypt-red)]",
      text: "text-white",
      tooltipBg: "bg-[var(--egypt-red)] text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
      ),
    },
    {
      label: "واتساب",
      href: "https://wa.me/201001234567",
      bg: "bg-[#25D366]",
      text: "text-white",
      tooltipBg: "bg-[#25D366] text-white",
      external: true,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
    },
  ];

  return (
    <div className="fab-container no-print">
      {/* Sub-actions */}
      {actions.map((action, i) => (
        <a
          key={i}
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          className={`fab-item ${action.bg} ${action.text} ${
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-75 pointer-events-none"
          }`}
          style={{
            transition: `all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
            transitionDelay: open ? `${i * 80}ms` : "0ms",
          }}
          aria-label={action.label}
        >
          {action.icon}
          <span className={`fab-tooltip ${action.tooltipBg} rounded-lg shadow-lg`}>
            {action.label}
          </span>
        </a>
      ))}

      {/* Main FAB button */}
      <button
        className={`fab-main ${open ? "rotate-45" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "إغلاق القائمة السريعة" : "فتح القائمة السريعة"}
        aria-expanded={open}
        style={{ transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}
