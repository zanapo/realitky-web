import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => (
  <Link href="/" className={cn("flex items-center gap-3", className)}>
    <Image
      src="/logo.png"
      alt="Realitní dům"
      width={320}
      height={96}
      className="h-12 w-auto lg:h-20"
      priority
    />
  </Link>
);
