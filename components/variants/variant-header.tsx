"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Variant } from "@/lib/variants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/nemovitosti", label: "Nemovitosti" },
  { href: "/o-nas", label: "O nás" },
  { href: "/sluzby", label: "Služby" },
  { href: "/poradna", label: "Poradna" },
  { href: "/kontakty", label: "Kontakty" },
];

const variantStyles: Record<
  Variant,
  {
    header: string;
    nav: string;
    link: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  "design-1": {
    header: "border-b bg-white/95 shadow-sm backdrop-blur",
    nav: "rounded-full border bg-muted/30 px-2 py-2 text-lg font-semibold text-foreground",
    link: "rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-primary",
    ctaPrimary: "",
    ctaSecondary: "variant-outline",
  },
  "design-2": {
    header: "border-b bg-white/90 backdrop-blur",
    nav: "rounded-2xl bg-white/70 px-3 py-3 text-lg font-semibold text-foreground shadow-sm",
    link: "rounded-xl px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary",
    ctaPrimary: "",
    ctaSecondary: "variant-outline",
  },
  "design-3": {
    header: "border-b bg-white shadow-md",
    nav: "rounded-full border border-foreground/10 px-4 py-2 text-lg font-semibold text-foreground",
    link: "rounded-full px-4 py-2 transition-colors hover:bg-foreground hover:text-white",
    ctaPrimary: "variant-invert",
    ctaSecondary: "variant-outline",
  },
  "design-4": {
    header: "border-b bg-white/95 shadow-sm backdrop-blur",
    nav: "rounded-full bg-muted px-2 py-2 text-lg font-semibold text-foreground",
    link: "rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-primary",
    ctaPrimary: "",
    ctaSecondary: "variant-outline",
  },
  "design-5": {
    header: "border-b bg-white shadow-sm",
    nav: "rounded-full border border-primary/20 bg-white px-2 py-2 text-lg font-semibold text-foreground",
    link: "rounded-full px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary",
    ctaPrimary: "",
    ctaSecondary: "variant-outline",
  },
};

type VariantHeaderProps = {
  variant: Variant;
};

export const VariantHeader = ({ variant }: VariantHeaderProps) => {
  const styles = variantStyles[variant];
  return (
    <header className={cn("sticky top-0 z-50", styles.header)}>
      <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
        <Logo />
        <nav className={cn("hidden items-center gap-2 lg:flex pointer-events-auto", styles.nav)}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${variant}${item.href}`}
              className={styles.link}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex pointer-events-auto">
          <Button
            variant="outline"
            size="lg"
            className={styles.ctaSecondary === "variant-outline" ? "" : undefined}
            asChild
          >
            <Link href={`/${variant}/nabizim`}>Nabídnout nemovitost</Link>
          </Button>
          <Button
            size="lg"
            variant={styles.ctaPrimary === "variant-invert" ? "secondary" : "default"}
            asChild
          >
            <Link href={`/${variant}/hledam`}>Hledám bydlení</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-16 w-16 lg:hidden">
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm px-6">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${variant}${item.href}`}
                  className="text-base font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button variant="outline" asChild className={cn("w-full")}>
                  <Link href={`/${variant}/nabizim`}>Nabídnout nemovitost</Link>
                </Button>
                <Button asChild className={cn("w-full")}>
                  <Link href={`/${variant}/hledam`}>Hledám bydlení</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
