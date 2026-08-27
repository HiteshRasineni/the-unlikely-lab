export default function ResearchSection({
  title,
  children,
  id,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10">
      <h2 className="mb-3 border-b border-neutral-200 pb-1 text-xl font-semibold text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
