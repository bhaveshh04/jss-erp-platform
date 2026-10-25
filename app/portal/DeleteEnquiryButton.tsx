"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteEnquiryButton({ kind, id }: { kind: "contact" | "application"; id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this entry permanently?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${kind}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      window.alert("Couldn't delete it. Please try again.");
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" /> {busy ? "Deleting…" : "Delete"}
    </button>
  );
}