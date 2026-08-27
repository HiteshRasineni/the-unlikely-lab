import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/notes", label: "Notes" },
  { href: "/code", label: "Code" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-widest text-black uppercase no-underline hover:text-neutral-600"
        >
          The Unlikely Lab
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="no-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
