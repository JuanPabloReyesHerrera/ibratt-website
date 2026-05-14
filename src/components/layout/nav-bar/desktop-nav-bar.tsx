"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavBarCategory } from "@/types/nav-bar";
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
    <NavigationMenu className="hidden sm:flex flex-row">
      <NavigationMenuList>
        {categories.map((category) => renderNavItem(category))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
