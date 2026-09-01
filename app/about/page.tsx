import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About The Unlikely Lab — a personal research laboratory at the intersection of machine learning, density estimation, anomaly detection, and high-energy physics.",
};

const interests = [
  "Density estimation",
  "Normalizing flows",
  "Anomaly detection",
  "Collider physics",
  "Dark matter searches",
  "Statistical inference",
  "Machine learning for high-energy physics",
];

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black sm:text-3xl">
        About The Unlikely Lab
      </h1>
      <p className="mt-5 max-w-prose text-[17px] leading-7 text-neutral-800">
        The Unlikely Lab is a personal research laboratory focused on the
        intersection of machine learning, density estimation, anomaly
        detection, and high-energy physics.
      </p>
      <p className="mt-4 max-w-prose text-[17px] leading-7 text-neutral-800">
        The research direction is centered on learning the structure of
        collider data and investigating statistically unusual events using
        reproducible, physics-aware machine learning methods.
      </p>

      <h2 className="mt-10 border-b border-neutral-200 pb-1 text-xl font-semibold">
        Research Interests
      </h2>
      <ul className="mt-4 list-disc pl-6 text-[16px] leading-7">
        {interests.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <h2 className="mt-10 border-b border-neutral-200 pb-1 text-xl font-semibold">
        Researchers
      </h2>
      <p className="mt-4 max-w-prose text-[17px] leading-7 text-neutral-800">
        Hitesh Rasineni
      </p>
      <p className="mt-1 max-w-prose text-[15px] leading-7 text-neutral-600">
        VIT-AP University, Amaravati, India
      </p>
      <p className="mt-2 max-w-prose text-[16px] leading-7 text-neutral-700">
        Undergraduate researcher working at the intersection of machine
        learning and high-energy physics.
      </p>
      <p className="mt-6 max-w-prose text-[17px] leading-7 text-neutral-800">
        Bhavishya Chebrolu
      </p>
      <p className="mt-1 max-w-prose text-[15px] leading-7 text-neutral-600">
        Mohan Babu University, Tirupati, India
      </p>
      <p className="mt-2 max-w-prose text-[16px] leading-7 text-neutral-700">
        Researcher working at the intersection of machine learning and
        high-energy physics.
      </p>

      <h2 className="mt-10 border-b border-neutral-200 pb-1 text-xl font-semibold">
        Sections
      </h2>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
        <li><Link href="/research">Research</Link></li>
        <li><Link href="/notes">Notes</Link></li>
        <li><Link href="/code">Code</Link></li>
      </ul>
    </div>
  );
}
