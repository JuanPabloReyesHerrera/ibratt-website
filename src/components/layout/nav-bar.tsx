import DesktopNavbar from "./desktop-nav-bar";
import PhoneNavBar from "./phone-nav-bar";
import { AudioLines } from "lucide-react";
import Link from "next/link";
import { NAV_BAR_CATEGORIES } from "@/lib/constants";

export default function NavBar() {
  return (
    <header className="dark fixed top-0 bg-gray-950 h-12 w-full flex items-center justify-between z-50 px-4">
      <Link href={"/"} className="text-2xl font-bold text-primary">
        🪬 IBRATT
      </Link>

      <DesktopNavbar categories={NAV_BAR_CATEGORIES} />
      <PhoneNavBar categories={NAV_BAR_CATEGORIES} />

      <div className="hidden md:flex">
        <AudioLines className="text-primary w-15" />
      </div>
    </header>
  );
}
