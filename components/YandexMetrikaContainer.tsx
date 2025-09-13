"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import YandexMetrikaInitializer from "@/components/YandexMetrikaInitializer";

type Props = {
  enabled: boolean;
};

const YandexMetrikaContainer: React.FC<Props> = ({ enabled }) => {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    console.log(
      `${pathname}${search.size ? `?${search}` : ""}${window.location.hash}`,
    );
  }, [hit, pathname, search]);

  if (!enabled) return null;

  return (
    <YandexMetrikaInitializer
      initParameters={{ webvisor: true, defer: true }}
    />
  );
};

export default YandexMetrikaContainer;
