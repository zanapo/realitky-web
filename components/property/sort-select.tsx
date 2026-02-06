"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sortOptions = [
  { value: "newest", label: "Nejnovější" },
  { value: "price-asc", label: "Cena od nejnižší" },
  { value: "price-desc", label: "Cena od nejvyšší" },
  { value: "area-desc", label: "Plocha od největší" },
];

export const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "newest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Řazení" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
