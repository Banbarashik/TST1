import Sidebar from "@/components/catalog/sidebar";

// TODO rename cause not only cataog, but all (main) pages
export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="3xl:pb-14 relative mx-auto flex w-full max-w-[1300px] flex-1 flex-col gap-10 px-3 pt-6 pb-22 lg:static lg:flex-row lg:pt-14 xl:pb-20 2xl:px-0">
      <Sidebar />
      {children}
    </main>
  );
}
