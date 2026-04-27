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
import type { NavBarCategory } from "@/types";
import { SocialsMediasButtons } from "@/components/shared";
import { siteConfig } from "@/config/site";

type PhoneNavBarProps = { categories: NavBarCategory[] };

export function PhoneNavBar({ categories }: PhoneNavBarProps) {
  return (
    <>
      <div className="hidden sm:flex items-center justify-end h-full">
        <AudioLines className="size-8 text-destructive " />
      </div>
      <Sheet>
        <SheetTrigger className="sm:hidden justify-end items-center flex text-ring touch-manipulation group">
          <Menu className="size-8 rounded-md p-1 group-hover:border group-hover:scale-125 group-active:bg-accent/50 group-active:text-white group-active:scale-90 transition-all" />
        </SheetTrigger>
        <SheetContent className="bg-black/80 w-[60dvw]!">
          <SheetHeader>
            <SheetTitle className="dark text-foreground">
              🪬 {siteConfig.logo}
            </SheetTitle>
            <SheetDescription>Producer/Songwriter</SheetDescription>
          </SheetHeader>
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
          <SheetFooter className="w-full flex items-center justify-center">
            <SocialsMediasButtons size={20} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
