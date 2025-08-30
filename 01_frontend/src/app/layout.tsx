import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300','400','500','700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "BTC-ECHO – MVP",
  description: "Inhaltsseite MVP mit Next.js und Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full bg-neutral-900">
      <body className={`${roboto.variable} font-sans text-neutral-100 min-h-screen`}>{children}</body>
    </html>
  );
}
