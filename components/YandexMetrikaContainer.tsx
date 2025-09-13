"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import YandexMetrikaInitializer from "@/components/YandexMetrikaInitializer";
import useYandexMetrika from "@/hooks/useYandexMetrika";

type Props = {
  enabled: boolean;
};

const YandexMetrikaContainer: React.FC<Props> = ({ enabled }) => {
  const pathname = usePathname();
  const search = useSearchParams();
  const { hit } = useYandexMetrika();

  useEffect(() => {
    hit(`${pathname}${search.size ? `?${search}` : ""}${window.location.hash}`);
  }, [hit, pathname, search]);

  if (!enabled) return null;

  return (
    <YandexMetrikaInitializer
      initParameters={{ webvisor: true, defer: true }}
    />
  );
};

export default YandexMetrikaContainer;
