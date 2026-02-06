import Link from "next/link";

import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/seo/site";
import type { Variant } from "@/lib/variants";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/nemovitosti", label: "Nemovitosti" },
  { href: "/sluzby", label: "Služby" },
  { href: "/poradna", label: "Poradna" },
  { href: "/kontakty", label: "Kontakty" },
];

const variantFooterStyles: Record<Variant, string> = {
  "design-1": "bg-white",
  "design-2": "bg-muted/30",
  "design-3": "bg-white",
  "design-4": "bg-muted/20",
  "design-5": "bg-white",
};

export const VariantFooter = ({ variant }: { variant: Variant }) => (
  <footer className={cn("border-t", variantFooterStyles[variant])}>
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Rychlé odkazy
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${variant}${link.href}`}
                  className="hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Kontakt
          </h3>
          <div>{siteConfig.phone}</div>
          <div>{siteConfig.email}</div>
          <div>{siteConfig.address}</div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
        <span>© 2026 {siteConfig.name}. Všechna práva vyhrazena.</span>
        <div className="flex items-center gap-4">
          <Link href={`/${variant}/gdpr`}>GDPR</Link>
          <Link href={`/${variant}/cookies`}>Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);
