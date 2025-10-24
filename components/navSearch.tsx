"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const submit = () => {
    const v = q.trim();
    if (!v) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(v)}`);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-search-popover"
        onClick={() => setOpen((o) => !o)}
        className="rounded-md px-3 py-2 hover:bg-gray-100"
      >
        Поиск
      </button>

      {open && (
        <div
          id="nav-search-popover"
          className="absolute top-full left-0 z-50 mt-2 w-72 rounded-md border bg-white p-2 shadow-lg"
        >
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Поиск…"
            className="w-full px-3 py-2 outline-none"
          />
        </div>
      )}
    </div>
  );
}
