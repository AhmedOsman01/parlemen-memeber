"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    setLoading(false);
    router.push('/admin/login');
  }

  return (
    <button onClick={logout} disabled={loading} className="px-3 py-2 bg-red-600 text-white rounded">
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
