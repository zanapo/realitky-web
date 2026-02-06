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
import { contactSchema } from "@/lib/validation";

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website?: string;
};

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, type: "contact" }),
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zpráva</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="S čím vám můžeme pomoci?" {...field} />
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
        <Button type="submit">Odeslat zprávu</Button>
        {status === "success" && (
          <p className="text-sm text-emerald-600">
            Děkujeme, ozveme se co nejdříve.
          </p>
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
