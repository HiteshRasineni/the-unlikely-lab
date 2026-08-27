import type { Metadata } from "next";
import { groupNotesByCategory } from "@/lib/content";
import NoteList from "@/components/NoteList";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "A scientific notebook of mathematical, statistical, physical, and machine-learning concepts supporting the research at The Unlikely Lab.",
};

export default function NotesIndexPage() {
  const groups = groupNotesByCategory();
  return (
    <div>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">Notes</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          A scientific notebook and knowledge archive. Notes document the
          mathematical, statistical, physical, and machine-learning concepts
          that support the research conducted at The Unlikely Lab.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.category} className="mb-10" aria-labelledby={`cat-${group.category.replace(/\s+/g, "-")}`}>
          <h2
            id={`cat-${group.category.replace(/\s+/g, "-")}`}
            className="border-b border-neutral-200 pb-1 text-lg font-semibold"
          >
            {group.category}
          </h2>
          <div className="mt-2">
            <NoteList notes={group.notes} />
          </div>
        </section>
      ))}
    </div>
  );
}
