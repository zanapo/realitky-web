import type { Variant } from "@/lib/variants";

import { VariantFooter } from "./variant-footer";
import { VariantHeader } from "./variant-header";

type VariantLayoutProps = {
  variant: Variant;
  children: React.ReactNode;
};

export const VariantLayout = ({ variant, children }: VariantLayoutProps) => (
  <div className={`min-h-screen theme-${variant}`}>
    <VariantHeader variant={variant} />
    <main className="flex-1">{children}</main>
    <VariantFooter variant={variant} />
  </div>
);
