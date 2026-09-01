import type { Metadata } from "next";
import Link from "next/link";
import { getAllResearch, getNote } from "@/lib/content";
import NoteList from "@/components/NoteList";

export const metadata: Metadata = {
  title: "The Unlikely Lab",
  description:
    "Learning the expected. Searching for the unexpected. Research in machine learning, density estimation, anomaly detection, and collider physics.",
};

const researchSummaries: Record<string, { tagline: string; description: string }> = {
  "mono-z": {
    tagline: "CMS Run 2015D Open Data · Neural Spline Flows",
    description:
      "A likelihood-based study of mono-Z event kinematics using Neural Spline Flows and CMS Run 2015D Open Data, with separate studies of the electron and muon channels.",
  },
  "z-hadronic": {
    tagline: "CMS Open Data · Hadronic Z decays",
    description:
      "An analysis of hadronic Z-boson decays using collider event data and machine-learning-based methods.",
  },
};

function recentNotes() {
  return [
    "density-estimation",
    "anomaly-tails",
    "normalizing-flows",
    "neural-spline-flows",
    "likelihood",
  ]
    .map((s) => getNote(s)?.frontmatter)
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
}

export default function HomePage() {
  const research = getAllResearch();
  return (
    <div>
      <section className="border-b border-neutral-200 pb-8">
        <p className="font-mono text-sm font-semibold tracking-widest uppercase">The Unlikely Lab</p>
        <h1 className="mt-4 text-xl leading-relaxed font-medium sm:text-2xl">
          Learning the expected.
          <br />
          Searching for the unexpected.
        </h1>
        <p className="mt-4 font-mono text-xs tracking-wide text-neutral-600">Machine Learning · Density Estimation · Collider Physics</p>
        <p className="mt-6 max-w-prose text-[17px] leading-7 text-neutral-800">
          The Unlikely Lab is a personal research laboratory focused on using machine learning and statistical methods to understand the structure of high-energy physics data and search for events that deviate from the expected distribution.
        </p>
      </section>

      <section className="border-b border-neutral-200 py-8" aria-labelledby="home-research">
        <h2 id="home-research" className="text-xl font-semibold">Research</h2>
        <div className="mt-5 space-y-7">
          {research.map((r) => {
            const summary = researchSummaries[r.slug];
            return (
              <article key={r.slug}>
                <h3 className="text-[17px] font-medium">{r.title}</h3>
                {summary && (
                  <p className="mt-0.5 font-mono text-xs text-neutral-600">{summary.tagline}</p>
                )}
                <p className="mt-2 max-w-prose text-[15px] leading-6 text-neutral-700">
                  {summary?.description ?? r.description}
                </p>
                <p className="mt-1.5 text-[15px]">
                  <Link href={`/research/${r.slug}`}>Read research ?</Link>
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-b border-neutral-200 py-8" aria-labelledby="home-notes">
        <h2 id="home-notes" className="text-xl font-semibold">Notes</h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Notes document the mathematical, statistical, physical, and machine-learning concepts that support the research conducted at The Unlikely Lab.
        </p>
        <div className="mt-4">
          <NoteList notes={recentNotes()} />
          <p className="mt-4 text-[15px]"><Link href="/notes">All notes ?</Link></p>
        </div>
      </section>

      <section className="border-b border-neutral-200 py-8" aria-labelledby="home-code">
        <h2 id="home-code" className="text-xl font-semibold">Code</h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Research code, analysis pipelines, preprocessing utilities, and reproducibility material are maintained alongside the corresponding research where possible.
        </p>
        <p className="mt-2 text-[15px]"><Link href="/code">Overview of code organization ?</Link></p>
      </section>

      <section className="py-8" aria-labelledby="home-about">
        <h2 id="home-about" className="text-xl font-semibold">About</h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          The Unlikely Lab is an independent research archive maintained by Hitesh Rasineni (VIT-AP University, Amaravati, India) and Bhavishya Chebrolu (Mohan Babu University, Tirupati, India), focused on the intersection of machine learning, density estimation, anomaly detection, and high-energy physics.
        </p>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          The long-term research direction is centered on reproducible, physics-aware machine learning methods for identifying unusual structure in collider data.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
          <li><Link href="/research">Research</Link></li>
          <li><Link href="/notes">Notes</Link></li>
          <li><Link href="/code">Code</Link></li>
          <li><Link href="/about">Contact</Link></li>
        </ul>
      </section>
    </div>
  );
}
