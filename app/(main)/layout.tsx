"use client";

import Sidebar from "@/components/catalog/sidebar";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <main className="3xl:pb-14 mx-auto flex w-full max-w-[1300px] flex-1 flex-col gap-10 px-3 pt-6 lg:pt-14 lg:pb-20">
      {!isMobile && <Sidebar />}
      {children}
    </main>
  );
}
