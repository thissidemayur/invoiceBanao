import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import React from "react";

export default function page() {
  return (
    <>
      <div className="h-screen w-full flex  items-center justify-center">
        <Card className="w-[420px]">
          <div className="bg-blue-100 size-15 items-center justify-center flex rounded-full mx-auto">
            <Mail className="size-8 text-blue-500" />
          </div>
          <CardHeader className="text-center font-bold">
            <CardTitle className="text-2xl">Check your email </CardTitle>
            <CardDescription>
              We have sent a verification link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-100 border-amber-400 rounded-r-sm flex justify-between p-3.5 gap-x-1 items-center">
              <AlertCircle className="text-yellow-400 size-5" />
              <p className="text-yellow-700 text-sm ">
                Be sure to check your spam folder!
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full",
                variant: "outline",
              })}
            >
              <ArrowLeft className="" /> Back to Homepage
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
