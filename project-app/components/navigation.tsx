"use client";
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet";
import {useMedia} from "react-use";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { NavButton } from "@/components/nav-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface SheetContentProps {
  side: "left" | "right";
  className?: string;
  children?: React.ReactNode;
}

const SheetContent: React.FC<SheetContentProps> = ({ side, className, children }) => {
  return (
    <div className={`sheet-content ${className}`} data-side={side}>
      {children}
    </div>
  );
};

const routes = [
    {
        href :"/",
        label : "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    }
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);
    
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition flex items-center justify-center"
                    >
                        <Menu className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2 bg-gradient-to-b from-stone-300 to-stone-400">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton 
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}