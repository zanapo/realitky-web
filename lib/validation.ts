import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Zadejte jméno."),
  email: z.string().email("Zadejte platný email."),
  phone: z.string().min(9, "Zadejte telefon."),
  message: z.string().min(10, "Zpráva je příliš krátká."),
  consent: z.boolean().refine((value) => value, {
    message: "Souhlas je povinný.",
  }),
  website: z.string().optional(),
});

export const demandSchema = z.object({
  name: z.string().min(2, "Zadejte jméno."),
  email: z.string().email("Zadejte platný email."),
  phone: z.string().min(9, "Zadejte telefon."),
  transactionType: z.enum(["prodej", "pronajem"]),
  propertyType: z.string().min(2, "Zadejte typ nemovitosti."),
  locality: z.string().min(2, "Zadejte lokalitu."),
  budget: z.string().min(1, "Zadejte rozpočet."),
  note: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Souhlas je povinný.",
  }),
  website: z.string().optional(),
});

export const offerSchema = z.object({
  name: z.string().min(2, "Zadejte jméno."),
  email: z.string().email("Zadejte platný email."),
  phone: z.string().min(9, "Zadejte telefon."),
  propertyType: z.string().min(2, "Zadejte typ nemovitosti."),
  locality: z.string().min(2, "Zadejte lokalitu."),
  price: z.string().min(1, "Zadejte představu o ceně."),
  note: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Souhlas je povinný.",
  }),
  website: z.string().optional(),
});
