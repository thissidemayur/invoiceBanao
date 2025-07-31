import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Graph from "./Graph";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";

export async function getInvooicesData(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PENDING",
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 20 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const aggregateData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    },
    {}
  );

  // convert to array from object
  const transform = Object.entries(aggregateData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + "," + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));
  return transform;
}
export default async function InvoiceGraph() {
  const session = await requiredUser();
  const graphData = await getInvooicesData(session.user?.id as string);
  console.log("graphData: ", graphData);
  return (
    <Card className="p-6">
      <CardTitle>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days
        </CardDescription>
      </CardTitle>
      <CardContent>
        <Graph data={graphData} />
      </CardContent>
    </Card>
  );
}
