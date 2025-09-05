import Sidebar from "@/components/catalog/sidebar";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex w-full max-w-[1300px] flex-1 gap-10 py-14">
      <Sidebar />
      {children}
    </main>
  );
}
