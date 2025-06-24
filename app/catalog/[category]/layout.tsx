import Sidebar from "@/components/catalog/sidebar";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-h-screen w-full max-w-7xl flex-1">
      <Sidebar />
      {children}
    </main>
  );
}
