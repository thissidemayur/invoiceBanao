import { RainbowButton } from "@/components/magicui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import invoicePage from "@/public/invoicePage.png";
import dashboardPage from "@/public/dashboardPage.png";
export default function Hero() {
  return (
    <section className=" relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center ">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 py-2 px-4 rounded-full">
          Introducing InvoiceBanao 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold">
          Invoicing made{" "}
          <span className="block  lg:-mt-4 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
            super easy!
          </span>
        </h1>
        <p className="max-w-xl mt-4 mx-auto lg:text-lg text-muted-foreground">
          Creating Invoice can be a pain! We at InvoiceBanao make it super easy
          for you to get paid in time
        </p>
        <div className="mt-7 mb-12 p-3">
          <Link href="/login">
            <RainbowButton>Get Unlimited Access</RainbowButton>
          </Link>
        </div>
      </div>
      <div className=" relative items-center w-fit py-12 mx-auto mt-12 shadow-2xl">
        <Image src={dashboardPage} alt="image" className="h-full w-cover" />
      </div>
      <div className=" relative items-center w-fit py-12 mx-auto mt-12 shadow-2xl">
        <Image src={invoicePage} alt="image" className="h-full w-cover" />
      </div>
    </section>
  );
}
