import type { Metadata } from "next";
import Link from "next/link";
import { getAllResearch } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research at The Unlikely Lab: density estimation, likelihood-based anomaly detection, and collider physics with CMS Open Data.",
};

const areas = [
  {
    area: "Density Estimation",
    items: [
      "Neural Spline Flows",
      "Likelihood estimation",
      "Multivariate density modeling",
    ],
  },
  {
    area: "Anomaly Detection",
    items: [
      "Unsupervised anomaly detection",
      "Likelihood-based scoring",
      "Rare-event searches",
    ],
  },
  {
    area: "Collider Physics",
    items: ["CMS Open Data", "Dark matter searches", "Z-boson physics", "Dijet events"],
  },
];

export default function ResearchIndexPage() {
  const research = getAllResearch();
  return (
    <div>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">Research</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          The research of The Unlikely Lab focuses on learning the structure of
          physical data and using statistical deviations from that structure to
          investigate rare and anomalous events.
        </p>
      </header>

      <section aria-labelledby="areas-heading">
        <h2 id="areas-heading" className="text-lg font-semibold">
          Conceptual areas
        </h2>
        <dl className="mt-4 space-y-4 text-[15px] leading-6">
          {areas.map((a) => (
            <div key={a.area}>
              <dt className="font-medium">{a.area}</dt>
              <dd className="mt-0.5 ml-4 list-disc pl-3 marker:text-neutral-400">
                <ul className="list-disc pl-4 marker:text-neutral-400">
                  {a.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="studies-heading">
        <h2 id="studies-heading" className="border-b border-neutral-200 pb-1 text-lg font-semibold">
          Research studies
        </h2>
        <ul className="divide-y divide-neutral-200">
          {research.map((r) => (
            <li key={r.slug} className="py-5">
              <Link href={`/research/${r.slug}`} className="text-[17px] font-medium">
                {r.title}
              </Link>
              <p className="mt-1.5 max-w-prose text-[15px] leading-6 text-neutral-700">
                {r.description}
              </p>
              {r.tags && (
                <p className="mt-1.5 font-mono text-xs text-neutral-600">
                  {r.tags.join(" · ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
