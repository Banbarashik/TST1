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
          <SelectItem value="airPower_asc">Производительность ↑</SelectItem>
          <SelectItem value="airPower_desc">Производительность ↓</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
