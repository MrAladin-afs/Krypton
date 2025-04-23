import React from "react";
import { NavBar } from "../../components/ui/tubelight-navbar";
import { Home, FileText, Info, Mail, Book } from "lucide-react";

// Define navigation items with Lucide icons that match the actual routes
const navItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Pricing",
    url: "/pricing",
    icon: FileText,
  },
  {
    name: "About",
    url: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    url: "/contact",
    icon: Mail,
  },
  {
    name: "Docs",
    url: "https://docs.kryptonnscripts.store/",
    icon: Book,
  },
];

export default function TubelightNavWrapper() {
  return <NavBar items={navItems} className="z-[100]" />;
}
