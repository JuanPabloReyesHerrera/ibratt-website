import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, TouchProvider } from "@/components/providers";
import NavBar from "@/components/layout/nav-bar";
import AudioPlayer from "@/components/layout/audio-player";
import { MOCK_BEATS } from "@/lib/mock-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IBRATT Website",
  description: "Landing page and beatstore for IBRATT, music producer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="py-12">
          <TouchProvider />
          <ThemeProvider>{children}</ThemeProvider>
        </main>
        <AudioPlayer beat={MOCK_BEATS[0]} />
      </body>
    </html>
  );
}
