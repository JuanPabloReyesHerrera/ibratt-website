"use client";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavBarCategory } from "../core/types";
import Link from "next/link";

function renderNavItem({ title, link }: NavBarCategory) {
  return (
    <NavigationMenuItem key={title}>
      <NavigationMenuLink asChild>
        <Link href={link} className="dark text-foreground active:scale-90">
          {title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

type DesktopNavBarProp = {
  categories: NavBarCategory[];
};

export function DesktopNavBar({ categories }: DesktopNavBarProp) {
  return (
    <div className="hidden sm:flex items-center justify-center w-full">
      <NavigationMenu>
        <NavigationMenuList>
          {categories.map((category) => renderNavItem(category))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
