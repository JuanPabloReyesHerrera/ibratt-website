import Link from "next/link";
import { NAV_BAR_CATEGORIES } from "../core/constants";
import { siteConfig } from "@/config/site";
import { PhoneNavBar, DesktopNavBar } from ".";
import { Button } from "@/components/ui";

export function NavBar() {
  return (
    <header className="dark fixed top-0 bg-gray-950 h-12 w-full grid grid-cols-2 sm:grid-cols-3 z-50 px-4">
      <Button
        variant="link"
        className="text-2xl font-bold text-ring flex items-center w-fit h-full p-0"
        asChild
      >
        <Link href={"/"}>
          <p>{siteConfig.logo}</p>
          <p className="uppercase">{siteConfig.name}</p>
        </Link>
      </Button>

      <DesktopNavBar categories={NAV_BAR_CATEGORIES} />

      <PhoneNavBar categories={NAV_BAR_CATEGORIES} />
    </header>
  );
}
