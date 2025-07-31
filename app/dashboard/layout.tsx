import React, { ReactNode, Suspense } from "react";

import Image from "next/image";
import Link from "next/link";
import DashboardLinks from "../componets/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { SkeletonCard } from "../componets/Skelton";
import SignOutPage from "../componets/Signout";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });
  if (!data?.firstName || !data.address || !data.lastName) {
    return redirect("/onboarding");
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requiredUser();
  await getUser(session.user?.id as string);
  return (
    <Suspense fallback={<SkeletonCard />}>
      <div className="grid min-h-screen w-full md:grid-cols[190px_1fr] lg:grid-cols-[220px_1fr] ">
        <div className="hidden border-r bg-muted md:block">
          <div className="flex h-14 lg:h-[60px] border-b px-4 lg:px-6 items-center bg-muted">
            <Link
              rel="stylesheet"
              href="/"
              className="flex items-center opacity-50 align-center "
            >
              <p className="text-2xl text-black font-bold ">
                Invoice<span className="text-blue-500">Banao</span>
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <DashboardLinks />
            </nav>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] border-b px-4 lg:px-6 items-center ">
            <Sheet>
              <SheetTrigger asChild>
                <SheetTitle>
                  <Button className="md:hidden" variant="outline" size="icon">
                    <Menu size={5} />
                  </Button>
                </SheetTitle>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-10 grid gap-3">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                  <Button
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Invoices</DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutPage />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-center" richColors closeButton theme="light" />
    </Suspense>
  );
}
