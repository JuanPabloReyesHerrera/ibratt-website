import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, TouchProvider } from "@/components/providers";
import { NavBar } from "@/features/nav-bar/components";
import { DrawerAudioPlayer } from "@/features/audio-player/components/drawer-audio-player";
import { getBeatsFromPublicFolder } from "@/lib/get-from-public-folder";
import { getBeats } from "@/features/beats/db/beats.queries";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const beats = getBeatsFromPublicFolder();
  const beats = await getBeats();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="flex flex-col h-svh">
        <NavBar />
        <TouchProvider />
        <ThemeProvider>
          <main className="flex-1 pt-navbar pb-audioplayer w-full">
            {children}
            <footer className="relative w-full h-footer bg-black flex items-center justify-center text-sm text-muted-foreground">
              ibratt.prod@gmail.com
            </footer>
          </main>
        </ThemeProvider>
        <DrawerAudioPlayer beats={beats} />
      </body>
    </html>
  );
}
