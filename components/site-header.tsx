"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/nemovitosti", label: "Nemovitosti" },
  { href: "/o-nas", label: "O nás" },
  { href: "/sluzby", label: "Služby" },
  { href: "/poradna", label: "Poradna" },
  { href: "/kontakty", label: "Kontakty" },
];

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
    <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
      <Logo />
      <nav className="hidden items-center gap-2 rounded-full border bg-muted/30 px-2 py-2 text-lg font-semibold text-foreground lg:flex pointer-events-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-3 lg:flex pointer-events-auto">
        <Button variant="outline" size="lg" asChild>
          <Link href="/nabizim">Nabídnout nemovitost</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/hledam">Hledám bydlení</Link>
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
              <SheetClose asChild key={item.href}>
                <Link href={item.href} className="text-base font-medium">
                  {item.label}
                </Link>
              </SheetClose>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <SheetClose asChild>
                <Button variant="outline" asChild className={cn("w-full")}>
                  <Link href="/nabizim">Nabídnout nemovitost</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className={cn("w-full")}>
                  <Link href="/hledam">Hledám bydlení</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
);
