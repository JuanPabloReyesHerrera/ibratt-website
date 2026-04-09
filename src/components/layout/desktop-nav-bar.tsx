"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import type { NavBarCategory } from "../../types/nav-bar";

function renderNavItem({ title, contents }: NavBarCategory) {
  const navCssColor = "dark text-foreground";

  return (
    <NavigationMenuItem key={title}>
      <NavigationMenuTrigger className={`${navCssColor}`}>
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-black text-white pt-4">
        <ul className="w-86 px-0">
          {contents?.map(({ content, description, link }) => (
            <li key={content} className="hover:bg-foreground/20 py-1">
              <Link href={link}>
                <div className="flex flex-col w-3xl gap-1 text-sm">
                  <div className="leading-none font-medium">{content}</div>
                  <div className="line-clamp-2 text-muted-foreground">
                    {description}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

type DesktopNavBarProp = {
  categories: NavBarCategory[];
};

export default function DesktopNavBar({ categories }: DesktopNavBarProp) {
  return (
    <NavigationMenu className="hidden md:flex flex-row">
      <NavigationMenuList>
        {categories.map((category) => renderNavItem(category))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
