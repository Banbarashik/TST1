export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <article className="flex flex-col gap-6">{children}</article>;
}
