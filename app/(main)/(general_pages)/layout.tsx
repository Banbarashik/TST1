export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="flex flex-col gap-6 lg:overflow-x-auto">
      {children}
    </article>
  );
}
