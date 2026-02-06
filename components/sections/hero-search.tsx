"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  "atyp",
];

export const HeroSearch = () => {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState("prodej");
  const [propertyType, setPropertyType] = useState("byt");
  const [disposition, setDisposition] = useState<string | undefined>();
  const [locality, setLocality] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set("transactionType", transactionType);
    params.set("propertyType", propertyType);
    if (disposition) params.set("disposition", disposition);
    if (locality) params.set("locality", locality);
    if (priceFrom) params.set("priceFrom", priceFrom);
    if (priceTo) params.set("priceTo", priceTo);
    if (areaFrom) params.set("areaFrom", areaFrom);
    if (areaTo) params.set("areaTo", areaTo);
    router.push(`/nemovitosti?${params.toString()}`);
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-lg">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger>
              <SelectValue placeholder="Transakce" />
            </SelectTrigger>
            <SelectContent>
              {transactionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Typ nemovitosti" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={disposition ?? ""} onValueChange={setDisposition}>
            <SelectTrigger>
              <SelectValue placeholder="Dispozice" />
            </SelectTrigger>
            <SelectContent>
              {dispositionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Lokalita / okres"
            value={locality}
            onChange={(event) => setLocality(event.target.value)}
          />
          <Input
            placeholder="Cena od"
            value={priceFrom}
            onChange={(event) => setPriceFrom(event.target.value)}
          />
          <Input
            placeholder="Cena do"
            value={priceTo}
            onChange={(event) => setPriceTo(event.target.value)}
          />
          <Input
            placeholder="Plocha od"
            value={areaFrom}
            onChange={(event) => setAreaFrom(event.target.value)}
          />
          <Input
            placeholder="Plocha do"
            value={areaTo}
            onChange={(event) => setAreaTo(event.target.value)}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-muted/40 p-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Využijte rychlé vyhledávání a objevte nové nabídky ještě dnes.
            </p>
          </div>
          <Button size="lg" onClick={handleSubmit} className="gap-2">
            <Search className="h-4 w-4" />
            Vyhledat
          </Button>
        </div>
      </div>
    </div>
  );
};
