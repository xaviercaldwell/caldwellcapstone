import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar.tsx';

export const metadata: Metadata = {
  title: "Caldwell Capstone",
  description: "secure software prototype for IPS 460 Capstone course"
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <Navbar />
        <main className="p-6 max-w-5xl mx-auto">
        {children}
        </main>
      </body>
    </html>
  );
}
