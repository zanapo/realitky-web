import { notFound } from "next/navigation";

import { VariantLayout } from "@/components/variants/variant-layout";
import { isVariant } from "@/lib/variants";

export default async function VariantRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ variant: string }>;
}) {
  const resolvedParams = await params;
  if (!isVariant(resolvedParams.variant)) {
    return notFound();
  }

  return (
    <VariantLayout variant={resolvedParams.variant}>{children}</VariantLayout>
  );
}
