"use client";
import { markAsDone } from "@/app/action";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { use, useTransition } from "react";
import { toast } from "sonner";

export default function page({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = use(params);
  const [isPending, transition] = useTransition();

  const handleMarkAsPaid = () => {
    transition(() => {
      toast.promise(markAsDone(invoiceId), {
        loading: "updating invoice status... ",
        success: "invoice successfully marked as PAID",
        error: "Failed to update the invoice status. Please try again",
      });

      redirect("/dashboard/invoices");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md border border-gray-200 shadow-xl rounded-2xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Confirm Payment
          </CardTitle>
          <CardDescription className="text-gray-600">
            Are you sure you want to mark this invoice as
            <span className="text-green-600 font-medium"> PAID</span>? This
            action will update the invoice status permanently.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4"></CardContent>

        <CardFooter className="flex justify-between items-center px-6 pb-6 pt-2">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button
            onClick={handleMarkAsPaid}
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isPending ? "Marking..." : "Mark as Paid"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
