import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, TouchProvider } from "@/components/providers";
import { NavBar } from "@/components/layout/nav-bar";
import { DrawerAudioPlayer } from "@/components/layout/player/drawer-audio-player";
import { getBeatsFromPublicFolder } from "@/lib/get-from-public-folder";

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
  const beats = getBeatsFromPublicFolder();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="flex flex-col">
        <NavBar />
        <TouchProvider />
        <ThemeProvider>
          <main className="flex-1 pt-12 pb-25 h-screen">
            {children}
            <footer className="w-full h-12 bg-muted flex items-center justify-center text-sm text-muted-foreground">
              ibratt.prod@gmail.com
            </footer>
          </main>
        </ThemeProvider>
        <DrawerAudioPlayer beats={beats} />
      </body>
    </html>
  );
}
