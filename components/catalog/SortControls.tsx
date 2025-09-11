"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ArrowUp, ArrowDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <SelectTrigger className="w-[220px] cursor-pointer">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default" className="cursor-pointer">
            По умолчанию
          </SelectItem>
          <SelectItem value="airPower_asc" className="cursor-pointer">
            <div className="flex items-center gap-1.5">
              Производительность <ArrowUp color="black" size={24} />
            </div>
          </SelectItem>
          <SelectItem value="airPower_desc" className="cursor-pointer">
            <div className="flex items-center gap-1.5">
              Производительность <ArrowDown color="black" size={24} />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
