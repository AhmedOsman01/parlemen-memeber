"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminRowActions({ id, editUrl, deleteApiUrl }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العنصر؟")) return;
    setLoading(true);
    try {
      const res = await fetch(`${deleteApiUrl}?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="flex gap-4">
      <Link 
        href={editUrl} 
        className="text-blue-600 hover:underline font-semibold"
      >
        تعديل
      </Link>
      <button 
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:underline font-semibold disabled:opacity-50"
      >
        {loading ? "جاري..." : "حذف"}
      </button>
    </div>
  );
}
