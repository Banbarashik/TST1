export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="@container flex w-full flex-col gap-6 lg:overflow-x-auto">
      {children}
    </article>
  );
}
