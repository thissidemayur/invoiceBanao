"use client";
import { deleteInvoice } from "@/app/action";
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
import { useRouter } from "next/navigation";
import React, { use, useTransition } from "react";
import { toast } from "sonner";

export default function page({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const router = useRouter();
  const { invoiceId } = use(params);

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      await deleteInvoice(invoiceId);
      toast.success("Invoice deleted successfully");
      startTransition(() => {
        router.push("/dashboard/invoices");
      });
    } catch (error) {
      toast.error("Failed to error invoice");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md border border-gray-200 shadow-xl rounded-2xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Confirm Deletion
          </CardTitle>
          <CardDescription className="text-gray-600">
            Are you sure you want to delete this invoice? This action is
            <span className="text-red-600 font-medium"> irreversible.</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Optionally show invoice details or ID */}
          {/* <p className="text-sm text-gray-500">Invoice ID: {invoiceId}</p> */}
        </CardContent>

        <CardFooter className="flex justify-between items-center px-6 pb-6 pt-2">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? "Deleting..." : "Delete Invoice"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
