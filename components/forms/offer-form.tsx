"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { offerSchema } from "@/lib/validation";

type OfferValues = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  locality: string;
  price: string;
  note?: string;
  consent: boolean;
  website?: string;
};

export const OfferForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<OfferValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      locality: "",
      price: "",
      note: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: OfferValues) => {
    setStatus("idle");
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, type: "offer" }),
    });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input placeholder="Website" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input placeholder="Vaše jméno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@domena.cz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="+420 777 000 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ nemovitosti</FormLabel>
                <FormControl>
                  <Input placeholder="byt, dům, pozemek..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokalita</FormLabel>
                <FormControl>
                  <Input placeholder="Ostrava, Opava..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cena</FormLabel>
                <FormControl>
                  <Input placeholder="6 500 000 Kč" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poznámka</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Upřesnění nabídky" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              </FormControl>
              <FormLabel>
                Souhlasím se zpracováním osobních údajů.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Odeslat nabídku</Button>
        {status === "success" && (
          <p className="text-sm text-emerald-600">Děkujeme za nabídku.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">
            Odeslání se nezdařilo. Zkuste to prosím znovu.
          </p>
        )}
      </form>
    </Form>
  );
};
