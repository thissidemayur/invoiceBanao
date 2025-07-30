import EditInvoice from "@/app/componets/EditInvoice";
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
  return <EditInvoice data={data} />;
}
