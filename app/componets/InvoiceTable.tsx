import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { Suspense } from "react";
import InvoiceAction from "./InvoiceAction";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { formatedCurrency, formatedDate } from "../utils/internationalAPI";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./EmptyState";
import { SkeletonCard } from "./Skelton";

const getAllInvoice = async (userId: string) => {
  return await prisma.invoice.findMany({
    where: { userId },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      invoiceNumber: true,
      clientName: true,
      status: true,
      total: true,
      date: true,
      currency: true,
      invoiceName: true,
    },
  });
};

export default async function InvoiceTable() {
  const session = await requiredUser();
  const invoiceList = await getAllInvoice(session.user?.id as string);

  if (!invoiceList.length)
    return (
      <EmptyState
        title="No invoices found"
        description="Create an invoice to start"
        buttonText="Create invoices "
        href="/dashboard/invoices/create"
      />
    );
  return (
    <Suspense fallback={<SkeletonCard />}>
      <Table>
        <TableCaption>List of invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Id</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceList?.map((invoiceItem) => (
            <TableRow key={invoiceItem.id}>
              <TableCell className="font-semibold">
                {invoiceItem.invoiceNumber}
              </TableCell>
              <TableCell>{invoiceItem.clientName}</TableCell>
              <TableCell>
                {formatedCurrency({
                  currency: invoiceItem.currency as any,
                  amount: invoiceItem.total,
                })}
              </TableCell>
              <TableCell>
                <Badge>{invoiceItem.status}</Badge>
              </TableCell>
              <TableCell>{formatedDate(invoiceItem.date)}</TableCell>
              <TableCell className="text-right">
                {/* invoice action */}
                <InvoiceAction
                  invoiceId={invoiceItem.id}
                  invoiceStatus={invoiceItem.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Amount </TableCell>
            <TableCell className="text-right">50000000</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Suspense>
  );
}
