import type { Metadata } from "next";
import { Instrument_Sans } from 'next/font/google';
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Link Shearing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={instrumentSans.className}>
        {children}</body>
    </html>
  );
}
