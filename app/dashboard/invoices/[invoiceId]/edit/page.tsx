import EditInvoice from "@/app/componets/EditInvoice";
import EmptyState from "@/app/componets/EmptyState";
import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import React from "react";

interface IGetData {
  invoiceId: string;
  userId: string;
}

async function getData({ invoiceId, userId }: IGetData) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  return data;
}

export default async function page({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;
  const session = await requiredUser();
  const data = await getData({ invoiceId, userId: session.user?.id as string });
  if (!data)
    return (
      <EmptyState
        title="You don’t have any invoices yet"
        description="Create your first invoice to get started. You can add line items, choose currency, and send it to your client in minutes."
        buttonText="Create a new invoice"
        href="/dashboard/invoices/create"
      />
    );
  return <EditInvoice data={data} />;
}
