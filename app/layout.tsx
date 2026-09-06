import type { Metadata } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";
import { company } from "@/data/company";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const mono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${company.companyName} | Construction with intent`,
  description: company.brand.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
