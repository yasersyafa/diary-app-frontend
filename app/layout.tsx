import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Blog - Yaser Syafa",
  description:
    "Full-stack developer sharing insights about modern web development, productivity, and remote work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${playfair.variable} ${sourceSans.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
