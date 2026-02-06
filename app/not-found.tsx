import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Stránka nebyla nalezena</h1>
      <p className="text-sm text-muted-foreground">
        Omlouváme se, ale požadovaná stránka neexistuje.
      </p>
      <Button asChild>
        <Link href="/">Zpět na homepage</Link>
      </Button>
    </div>
  );
}
