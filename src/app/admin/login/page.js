"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
        // ensure cookies set by the server are accepted in the browser
        credentials: 'same-origin'
      });
      // parse response safely (may be text on error)
      let data = {};
      try {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) data = await res.json();
        else data = { error: await res.text() };
      } catch (e) {
        data = { error: 'Failed to parse response' };
      }

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // If server returned token and csrf in body, set cookies client-side as a fallback for local testing.
      try {
        if (data.token) {
          // set cookie for admin_jwt (not HttpOnly) so subsequent requests include it
          document.cookie = `admin_jwt=${data.token}; path=/`;
        }
        if (data.csrf) {
          document.cookie = `admin_csrf=${data.csrf}; path=/`;
        }
      } catch (e) {
        // ignore
      }

      // Redirect to admin dashboard and replace history
      router.replace('/admin');
    } catch (e) {
      setError('Network error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-6">
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
      >
        ← الرئيسية
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#d4af37] text-[#1a1a2e] font-bold text-2xl mb-4">
            نائب
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
          <p className="text-white/60">دخول المسؤولين فقط</p>
        </div>

        {/* Form Container */}
        <form onSubmit={submit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {/* Username Input */}
          <div className="mb-6">
            <label className="block mb-3">
              <span className="text-sm font-semibold text-white/80 block mb-2">اسم المستخدم</span>
              <input
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="أدخل اسم المستخدم"
                disabled={loading}
                required
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block mb-3">
              <span className="text-sm font-semibold text-white/80 block mb-2">كلمة المرور</span>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="أدخل كلمة المرور"
                disabled={loading}
                required
              />
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-[#d4af37] hover:bg-[#e8c13f] text-[#1a1a2e] font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#d4af37]/50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-[#1a1a2e]/30 border-t-[#1a1a2e] rounded-full animate-spin" />
                جاري الدخول...
              </span>
            ) : (
              'دخول'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          الوصول محدود للمسؤولين المصرحين فقط
        </p>
      </div>
    </div>
  );
}
