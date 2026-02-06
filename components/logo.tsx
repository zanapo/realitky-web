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
      width={400}
      height={128}
      className="h-32 w-auto"
      priority
    />
  </Link>
);
