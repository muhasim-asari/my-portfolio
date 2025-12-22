// app/layout.tsx
import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google"; // Import font baru
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import PageLoader from "@/components/PageLoader";

// Font untuk Judul (Bold & Artsy)
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

// Font untuk Teks Body (Indie/Tech)
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Hasim Asari - Personal Website",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceMono.variable} bg-[#0f0f0f] text-white antialiased`}
      >
        <LanguageProvider>
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
