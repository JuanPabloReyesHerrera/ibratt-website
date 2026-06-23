/**
 * PHONE NAV BAR
 *
 * Barra de navegación responsiva para dispositivos móviles.
 * Características:
 * - Ícono de audio visible solo en desktop (sm:flex)
 * - Sheet (drawer) con menú hamburguesa para móviles (sm:hidden)
 * - Navegación por categorías con links cerrables
 * - Footer con botones de redes sociales
 * - Animaciones en hover/active (scale, background, transición)
 * - Touch-friendly con manipulación táctil optimizada
 */

"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AudioLines, Menu } from "lucide-react";
import Link from "next/link";
import type { NavBarCategory } from "../core/types";
import { SocialsMediasButtons } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui";

type PhoneNavBarProps = { categories: NavBarCategory[] };

export function PhoneNavBar({ categories }: PhoneNavBarProps) {
  return (
    <>
      {/* Ícono de audio: visible solo en pantallas sm+ (escritorio) */}
      <div className="hidden sm:flex items-center justify-end h-full">
        <AudioLines className="size-8 text-destructive " />
      </div>

      {/* Sheet (drawer) del menú móvil */}
      <Sheet>
        {/* Trigger: botón hamburguesa visible solo en móviles (sm:hidden) */}
        <SheetTrigger className="sm:hidden justify-end items-center flex text-ring touch-manipulation group">
          <Menu className="size-8 rounded-md p-1 group-hover:border group-hover:scale-125 group-active:bg-accent/50 group-active:text-white group-active:scale-90 transition-all" />
        </SheetTrigger>

        {/* Contenido del drawer: oscuro y semi-transparente */}
        <SheetContent className="bg-black/80 w-[60dvw]!">
          {/* Header: logo y nombre del sitio */}
          <SheetHeader>
            <SheetTitle className="dark text-foreground">
              <SheetClose asChild>
                <Button
                  variant={"link"}
                  className="text-ring uppercase font-bold p-0"
                >
                  <Link href="/">
                    {siteConfig.logo}
                    <span>{siteConfig.name}</span>
                  </Link>
                </Button>
              </SheetClose>
            </SheetTitle>
            <SheetDescription>Producer/Songwriter</SheetDescription>
          </SheetHeader>

          {/* Navegación: lista de categorías con links cerrables */}
          <div className="w-full">
            <nav className="flex flex-col mt-6">
              {categories.map(({ title, link }) => (
                <SheetClose
                  asChild
                  key={title}
                  className="dark p-2 transition-all hover:bg-accent/30 active:bg-destructive "
                >
                  <Link href={link} className="text-foreground text-lg">
                    {title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>

          {/* Footer: botones de redes sociales */}
          <SheetFooter className="w-full flex items-center justify-center">
            <SocialsMediasButtons size={20} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
