import { AudioLines } from "lucide-react";
import Link from "next/link";
import { NAV_BAR_CATEGORIES } from "@/lib/constants";
import { siteConfig } from "@/config/site";
import { PhoneNavBar, DesktopNavBar } from "./";

export function NavBar() {
  return (
    <header className="dark fixed top-0 bg-gray-950 h-12 w-full grid grid-cols-2 sm:grid-cols-3 z-50 px-4">
      <Link
        href={"/"}
        className="text-2xl font-bold text-ring flex items-center"
      >
        🪬 {siteConfig.logo}
      </Link>

      <DesktopNavBar categories={NAV_BAR_CATEGORIES} />

      <PhoneNavBar categories={NAV_BAR_CATEGORIES} />
    </header>
  );
}
