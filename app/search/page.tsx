import SearchResults from "@/components/searchResults";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return (
    <main className="relative flex grow flex-col pb-18">
      <div className="3xl:-bottom-[160px] bg-secondary absolute hidden h-[0.1px] w-full lg:-bottom-[196.5px] lg:block"></div>
      {/* Allow SearchResults to grow */}
      <SearchResults initialQuery={query} />
    </main>
  );
}
