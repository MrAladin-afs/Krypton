import React from "react";
import { NavBar } from "../../components/ui/tubelight-navbar";
import { Home, FileText, Info, Mail } from "lucide-react";

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
];

export default function TubelightNavWrapper() {
  return <NavBar items={navItems} className="z-[100]" />;
}
