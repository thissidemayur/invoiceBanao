import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { formatedCurrency } from "../utils/internationalAPI";
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7, //limit the 7
  });
  return data;
}

export default async function RecentInvoices() {
  const session = await requiredUser();
  const clientData = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle> Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className=" flex  flex-col gap-3">
        {clientData.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback className="text-xs">
                {item.clientName.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs font-medium leading-none">
                {item.clientName}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.clientEmail}
              </p>
            </div>
            <div className="ml-auto text-sm font-medium">
              {formatedCurrency({
                amount: item.total,
                currency: item.currency as any,
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
