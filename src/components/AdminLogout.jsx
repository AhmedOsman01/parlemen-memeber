"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      // read CSRF cookie (admin_csrf) and send as header
      const cookie = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_csrf='));
      const csrf = cookie ? cookie.split('=')[1] : null;
      await fetch('/api/admin/logout', { method: 'POST', headers: csrf ? { 'x-csrf': csrf } : {} });
    } catch (e) {
      // ignore
    }
    setLoading(false);
    // replace history entry so using browser back won't return to protected admin page
    router.replace('/admin/login');
  }

  return (
    <button 
      onClick={logout} 
      disabled={loading} 
      className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
    >
      {loading ? 'جاري الخروج...' : 'تسجيل الخروج'}
    </button>
  );
}
