import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/ui/tubelight-navbar";
import { Home, FileText, Info, BookOpen, Mail } from "lucide-react";

export default function TubelightNavWrapper() {
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
      name: "Blog",
      url: "/blog",
      icon: BookOpen,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: Mail,
    },
  ];

  const [mounted, setMounted] = useState(false);

  // Ensure component is only rendered client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <NavBar
      items={navItems}
      className="z-[100]" // Higher z-index to ensure it's visible
    />
  );
}
