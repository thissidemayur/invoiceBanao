import InvoiceTable from "@/app/componets/InvoiceTable";
import { SkeletonCard } from "@/app/componets/Skelton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Invoices() {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center ">
            <div>
              <CardTitle className="text-xl">Invoices</CardTitle>
              <CardDescription>Manage your invoices right here</CardDescription>
            </div>
            <Link
              href="/dashboard/invoices/create"
              className={buttonVariants({
                className: "flex gap-x-2",
                variant: "default",
              })}
            >
              <PlusIcon />
              Create Invoice
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SkeletonCard />}>
            <InvoiceTable />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
}
