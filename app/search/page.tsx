import SearchResults from "@/components/searchResults";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return <SearchResults initialQuery={query} />;
}
