"use client";
import React, { Suspense } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { SkeletonCard } from "./Skelton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface iAppProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function Graph({ data }: iAppProps) {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <ChartContainer config={chartConfig}>
        <LineChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="amount"
            type="monotone"
            stroke="var(--chart-3)"
            strokeWidth={2}
            dot={{ fill: "var(--chart-3)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </Suspense>
  );
}
