"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button, TextField } from "../ui";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 0.82;

/**
 * Shrinks a photo in the browser before upload: caps the width at 1920px and
 * re-encodes as WebP. A 6 MB phone photo typically becomes a few hundred KB,
 * which keeps the page fast and stays well under hosting upload limits.
 * Animated GIFs are sent untouched (re-encoding would flatten the animation).
 */
async function compressImage(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", WEBP_QUALITY));
    // If the browser couldn't encode WebP, or the result isn't smaller, keep the original.
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  /** Called with the new image URL ("" when removed). */
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const blob = await compressImage(file);
      const body = new FormData();
      body.append("file", blob, file.name);

      const res = await fetch("/api/admin/media", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      <div className="rounded-xl border border-line bg-white p-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="mb-3 h-32 w-full max-w-sm rounded-lg border border-line object-cover" />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <Button type="button" variant="secondary" disabled={uploading} onClick={() => inputRef.current?.click()}>
            <ImagePlus className="h-4 w-4" /> {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </Button>
          {value && (
            <Button type="button" variant="ghost" onClick={() => onChange("")}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          )}
        </div>

        <div className="mt-3">
          <TextField
            label="…or paste an image link"
            placeholder="https://"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <p className="mt-2 text-xs text-slate">JPG, PNG, WebP or GIF. Wide images (about 1600×800) look best.</p>
      </div>
    </div>
  );
}
