import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../src/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initially set the active tab based on current URL
    const path = window.location.pathname;
    const activeItem = items.find((item) => {
      if (path === "/" && item.url === "/") return true;
      return path !== "/" && item.url !== "/" && path.startsWith(item.url);
    });
    setActiveTab(
      activeItem?.name || (items[0].url === "/" ? items[0].name : "")
    );

    // Listen for URL changes
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const activeItem = items.find((item) => {
        if (path === "/" && item.url === "/") return true;
        return path !== "/" && item.url !== "/" && path.startsWith(item.url);
      });
      setActiveTab(
        activeItem?.name || (items[0].url === "/" ? items[0].name : "")
      );
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, [items]);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:top-0 left-1/2 -translate-x-1/2 z-50",
        className
      )}>
      <div className="flex items-center gap-1 bg-background/60 border border-border/60 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}>
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full">
                    <div className="absolute w-10 h-5 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
