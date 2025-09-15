import Sidebar from "@/components/catalog/sidebar";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="3xl:pb-14 mx-auto flex w-full max-w-[1300px] flex-1 flex-col gap-10 px-3 pt-14 lg:pb-20">
      <Sidebar />
      {children}
    </main>
  );
}
