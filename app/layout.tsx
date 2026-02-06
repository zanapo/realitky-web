import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Realitní dům",
    template: "%s | Realitní dům",
  },
  description:
    "Moderní realitní kancelář pro prodej, pronájem a ocenění nemovitostí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
