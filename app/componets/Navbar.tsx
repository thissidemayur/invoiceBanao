import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.webp";
import { buttonVariants } from "@/components/ui/button";
export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />
        <h3 className="font-semibold text-3xl">
          Invoice<span className="text-blue-500">Banao</span>
        </h3>
      </Link>
      <Link href="/login" className={buttonVariants()}>
        Get Started
      </Link>
    </div>
  );
}
