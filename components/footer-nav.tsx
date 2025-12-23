"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Girl from "@/assets/icons/girl.svg";
import Home from "@/assets/icons/home.svg";
import Image from "next/image";
import Add from "@/assets/icons/add.svg";
import { Card } from "./ui/card";

export function FooterNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/add", icon: Add, label: "Add" },
    { href: "/profile", icon: Girl, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 m-4">
      <Card className="bg-[inherit] px-0 py-0">
        <div className="flex justify-around w-full items-center h-14 max-w-screen-xl mx-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <Image
                  src={link.icon}
                  alt="avatar"
                  width={32}
                  height={32}
                  // className="rounded-full"
                  // unoptimized
                />
                {/* <span className="text-xs mt-1">{link.label}</span> */}
              </Link>
            );
          })}
        </div>
      </Card>
    </nav>
  );
}
