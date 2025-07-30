import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, User } from "lucide-react";
import React, { Suspense } from "react";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { SkeletonCard } from "./Skelton";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
        currency: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}

export default async function DashboardBlock() {
  const session = await requiredUser();
  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  );
  return (
    <Suspense fallback={<SkeletonCard />}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {/* card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-0 space-y-0">
            <CardTitle className="text-sm font-medium py-0 space-y-0">
              Total revenue
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground py-0 space-y-0" />
          </CardHeader>
          <CardContent className="py-0 space-y-0">
            <h2 className="text-2xl font-bold">
              {data.reduce((acc, invoice) => acc + invoice.total, 0)}{" "}
            </h2>
            <p className="text-xs text-muted-foreground">
              based on total volume
            </p>
          </CardContent>
        </Card>

        {/* card */}
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Invoice User</CardTitle>
            <User className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">{data?.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total invoices Issued
            </p>
          </CardContent>
        </Card>

        {/* card */}
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle>Paid Invoices</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">{paidInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total invoices which have be paid
            </p>
          </CardContent>
        </Card>

        {/* card */}
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle>Open Invoices</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">{openInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">
              Invoices which have be paid
            </p>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
