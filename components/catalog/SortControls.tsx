"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SortControls() {
  const router = useRouter();
  const sp = useSearchParams();
  const current = sp.get("sort") ?? "default";

  function setSort(value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    // при смене сортировки — сбрасываем страницу
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <Select value={current} onValueChange={setSort}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">По умолчанию</SelectItem>
          <SelectItem value="name_asc">Название A→Я</SelectItem>
          <SelectItem value="name_desc">Название Я→A</SelectItem>
          <SelectItem value="price_asc">Цена ↑</SelectItem>
          <SelectItem value="price_desc">Цена ↓</SelectItem>
        </SelectContent>
      </Select>

      {current !== "default" && (
        <Button variant="ghost" onClick={() => setSort("default")}>
          Сбросить
        </Button>
      )}
    </div>
  );
}
