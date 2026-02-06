import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = {
  href?: string;
  label: string;
};

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <Breadcrumb className="text-sm text-muted-foreground">
    <BreadcrumbList>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <BreadcrumbItem key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {!isLast && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      })}
    </BreadcrumbList>
  </Breadcrumb>
);
