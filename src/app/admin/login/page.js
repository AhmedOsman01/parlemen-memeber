"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
  // server sets cookie; just redirect to admin contacts
  router.push('/admin/contacts');
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Admin login</h1>
        <form onSubmit={submit}>
          <label className="block mb-2">
            <span className="text-sm">Username</span>
            <input value={user} onChange={e => setUser(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </label>
          <label className="block mb-4">
            <span className="text-sm">Password</span>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </label>
          {error && <div className="text-red-600 mb-3">{error}</div>}
          <button disabled={loading} className="w-full bg-(--gold) text-(--navy) px-4 py-2 rounded font-semibold">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
