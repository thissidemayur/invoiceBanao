"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardItem = [
  { id: 0, name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
  { id: 1, name: "Invoice", icon: User2, href: "/invoice" },
];
export default function DashboardLinks() {
  const pathname = usePathname();
  // const pathname = "";
  return (
    <>
      {DashboardItem?.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-gray-600 hover:text-foreground ",
            "flex gap-2  items-center rounded-md px-3 py-2 transition-all text-primiarly"
          )}
        >
          {<link.icon />} {link.name}
        </Link>
      ))}
    </>
  );
}
