import Sidebar from "@/components/catalog/sidebar";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Sidebar />
    </main>
  );
}
