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
import { AudioLines } from "lucide-react";
import Link from "next/link";
import type { NavBarCategory } from "@/types";
import { MOCK_SOCIAL_MEDIA } from "@/lib/mock-data";
import { SocialsMediasButtons } from "../shared";
import { siteConfig } from "@/config/site";

type PhoneNavBarProps = { categories: NavBarCategory[] };

export default function PhoneNavBar({ categories }: PhoneNavBarProps) {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden text-ring bg-transparent touch-manipulation group">
        <AudioLines className="size-8 rounded-md p-1 group-hover:border group-hover:scale-125 group-active:bg-accent/50 group-active:text-white group-active:scale-50 transition-all" />
      </SheetTrigger>
      <SheetContent className="bg-black/80">
        <SheetHeader>
          <SheetTitle className="dark text-foreground">
            🪬 {siteConfig.logo}
          </SheetTitle>
          <SheetDescription>Producer/Songwriter</SheetDescription>
        </SheetHeader>
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
        <SheetFooter className="w-full flex items-center justify-center">
          <SocialsMediasButtons socialsMedias={MOCK_SOCIAL_MEDIA} size={3} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
