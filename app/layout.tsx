import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { PERSONAL } from "@/content/personal";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Happy Birthday ${PERSONAL.herName} ❤️`,
  description: `A luxury birthday celebration for my beautiful ${PERSONAL.herName}`,
  openGraph: {
    title: `Happy Birthday ${PERSONAL.herName} ❤️`,
    description: `A special birthday surprise from ${PERSONAL.yourName}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
