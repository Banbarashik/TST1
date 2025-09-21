"use client";

import Sidebar from "@/components/catalog/sidebar";

import { useMediaQuery } from "@/hooks/useMediaQuery";

// TODO rename cause not only cataog, but all (main) pages
export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <main className="3xl:pb-14 mx-auto flex w-full max-w-[1300px] flex-1 flex-col gap-10 px-3 pt-6 sm:pb-22 lg:flex-row lg:pt-14 xl:pb-20 2xl:px-0">
      {!isMobile && <Sidebar />}
      {children}
    </main>
  );
}
