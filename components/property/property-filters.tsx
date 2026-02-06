"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transactionOptions = [
  { value: "prodej", label: "Prodej" },
  { value: "pronajem", label: "Pronájem" },
];

const typeOptions = [
  { value: "byt", label: "Byt" },
  { value: "dum", label: "Dům" },
  { value: "pozemek", label: "Pozemek" },
  { value: "komerce", label: "Komerce" },
  { value: "chalupa", label: "Chalupa" },
  { value: "garaz", label: "Garáž" },
];

const dispositionOptions = [
  "1+kk",
  "1+1",
  "2+kk",
  "2+1",
  "3+kk",
  "3+1",
  "4+kk",
  "4+1",
  "5+kk",
  "5+1",
  "6+kk",
  "6+1",
  "atyp",
];

const conditionOptions = ["Novostavba", "Po rekonstrukci", "Původní stav"];
const featureOptions = [
  "Balkon",
  "Terasa",
  "Garáž",
  "Parkování",
  "Zahrada",
  "Výtah",
  "Klimatizace",
  "Krb",
  "Recepce",
];

export const PropertyFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => {
    const get = (key: string) => searchParams.get(key) ?? "";
    return {
      transactionType: get("transactionType"),
      propertyType: get("propertyType"),
      disposition: get("disposition"),
      locality: get("locality"),
      district: get("district"),
      priceFrom: get("priceFrom"),
      priceTo: get("priceTo"),
      areaFrom: get("areaFrom"),
      areaTo: get("areaTo"),
      condition: get("condition"),
      features: searchParams.get("features")?.split(",").filter(Boolean) ?? [],
      sort: get("sort"),
    };
  }, [searchParams]);

  const [state, setState] = useState(initial);

  useEffect(() => {
    setState(initial);
  }, [initial]);

  const update = (key: string, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (value: string) => {
    setState((prev) => {
      const features = prev.features.includes(value)
        ? prev.features.filter((item) => item !== value)
        : [...prev.features, value];
      return { ...prev, features };
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (!value) return;
      if (key === "features") {
        if (Array.isArray(value) && value.length > 0) {
          params.set("features", value.join(","));
        }
        return;
      }
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4">
        <div>
          <Label>Transakce</Label>
          <Select
            value={state.transactionType}
            onValueChange={(value) => update("transactionType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vyberte" />
            </SelectTrigger>
            <SelectContent>
              {transactionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Typ nemovitosti</Label>
          <Select
            value={state.propertyType}
            onValueChange={(value) => update("propertyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vyberte" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Dispozice</Label>
          <Select
            value={state.disposition}
            onValueChange={(value) => update("disposition", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vyberte" />
            </SelectTrigger>
            <SelectContent>
              {dispositionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Lokalita</Label>
          <Input
            placeholder="Ostrava, Opava"
            value={state.locality}
            onChange={(event) => update("locality", event.target.value)}
          />
        </div>
        <div>
          <Label>Okres</Label>
          <Input
            placeholder="Ostrava-město"
            value={state.district}
            onChange={(event) => update("district", event.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label>Cena</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Od"
              value={state.priceFrom}
              onChange={(event) => update("priceFrom", event.target.value)}
            />
            <Input
              placeholder="Do"
              value={state.priceTo}
              onChange={(event) => update("priceTo", event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label>Plocha</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Od"
              value={state.areaFrom}
              onChange={(event) => update("areaFrom", event.target.value)}
            />
            <Input
              placeholder="Do"
              value={state.areaTo}
              onChange={(event) => update("areaTo", event.target.value)}
            />
          </div>
        </div>
        <div>
          <Label>Stav</Label>
          <Select
            value={state.condition}
            onValueChange={(value) => update("condition", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vyberte" />
            </SelectTrigger>
            <SelectContent>
              {conditionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Vybavení</Label>
          <div className="grid gap-2">
            {featureOptions.map((feature) => (
              <label key={feature} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={state.features.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Použít filtry</Button>
        <Button variant="outline" onClick={resetFilters}>
          Resetovat
        </Button>
      </div>
    </div>
  );
};
