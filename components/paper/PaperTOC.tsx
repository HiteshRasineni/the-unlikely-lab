"use client";

import { useState } from "react";
import type { PaperTOCEntry } from "@/lib/paper";

export default function PaperTOC({ entries }: { entries: PaperTOCEntry[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Article contents" className="paper-toc mb-10 print:hidden">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Contents
      </h2>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center border border-neutral-300 px-3 py-1 text-sm md:hidden"
        aria-expanded={open}
      >
        {open ? "Hide outline" : "Show outline"}
      </button>
      <ol
        className={`mt-3 space-y-1.5 border-l border-neutral-200 pl-4 text-[15px] leading-6 ${
          open ? "block" : "hidden"
        } md:block`}
      >
        {entries.map((e) => (
          <li key={e.id} className={e.level === 3 ? "ml-4" : ""}>
            <a href={`#${e.id}`} className="text-neutral-700 no-underline hover:text-black">
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
