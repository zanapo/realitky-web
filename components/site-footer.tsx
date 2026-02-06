import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/seo/site";

const quickLinks = [
  { href: "/nemovitosti", label: "Nemovitosti" },
  { href: "/sluzby", label: "Služby" },
  { href: "/poradna", label: "Poradna" },
  { href: "/kontakty", label: "Kontakty" },
];

export const SiteFooter = () => (
  <footer className="border-t bg-white">
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
                <Link href={link.href} className="hover:text-foreground">
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
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{siteConfig.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
        <span>© 2026 {siteConfig.name}. Všechna práva vyhrazena.</span>
        <div className="flex items-center gap-4">
          <Link href="/gdpr">GDPR</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);
