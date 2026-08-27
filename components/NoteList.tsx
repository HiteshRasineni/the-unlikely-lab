import Link from "next/link";
import type { NoteFrontmatter } from "@/lib/content";

/**
 * Simple list of notes with separators — deliberately not card-based.
 */
export default function NoteList({ notes }: { notes: NoteFrontmatter[] }) {
  return (
    <ul className="divide-y divide-neutral-200">
      {notes.map((note) => (
        <li key={note.slug} className="py-4">
          <Link href={`/notes/${note.slug}`} className="text-[17px] font-medium">
            {note.title}
          </Link>
          <p className="mt-1 font-mono text-xs text-neutral-600">
            {note.category} · {note.tags.join(" · ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
