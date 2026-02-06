import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema, demandSchema, offerSchema } from "@/lib/validation";

const buildEmailHtml = (entries: Record<string, string>) =>
  Object.entries(entries)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");

export async function POST(request: Request) {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  const limiter = rateLimit(`forms:${ip}`);
  if (!limiter.allowed) {
    return NextResponse.json(
      { ok: false, message: "Zkuste to prosím později." },
      { status: 429 }
    );
  }

  const body = (await request.json()) as Record<string, unknown>;
  const type = body.type;
  const website = typeof body.website === "string" ? body.website : "";
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    if (type === "contact") {
      const data = contactSchema.parse(body);
      await sendContactEmail({
        subject: "Nový kontakt z webu",
        replyTo: data.email,
        html: buildEmailHtml({
          Jméno: data.name,
          Email: data.email,
          Telefon: data.phone,
          Zpráva: data.message,
        }),
      });
    } else if (type === "demand") {
      const data = demandSchema.parse(body);
      await sendContactEmail({
        subject: "Nová poptávka",
        replyTo: data.email,
        html: buildEmailHtml({
          Jméno: data.name,
          Email: data.email,
          Telefon: data.phone,
          "Typ transakce": data.transactionType,
          "Typ nemovitosti": data.propertyType,
          Lokalita: data.locality,
          Rozpočet: data.budget,
          Poznámka: data.note ?? "-",
        }),
      });
    } else if (type === "offer") {
      const data = offerSchema.parse(body);
      await sendContactEmail({
        subject: "Nová nabídka nemovitosti",
        replyTo: data.email,
        html: buildEmailHtml({
          Jméno: data.name,
          Email: data.email,
          Telefon: data.phone,
          "Typ nemovitosti": data.propertyType,
          Lokalita: data.locality,
          Cena: data.price,
          Poznámka: data.note ?? "-",
        }),
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "Neznámý typ formuláře." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Zkontrolujte zadané údaje." },
      { status: 400 }
    );
  }
}
