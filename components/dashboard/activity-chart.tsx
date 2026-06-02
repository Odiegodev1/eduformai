"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { activityData } from "@/lib/mock-data"
import { getActivityData } from "./actions/getactivity"

const chartConfig = {
  forms: {
    label: "Formulários",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface ActivityChartProps {
  data: Awaited<ReturnType<typeof getActivityData>>
}

export  function ActivityChart({ data }: ActivityChartProps) {
 

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Atividade</CardTitle>
        <CardDescription>Formulários criados nos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="forms" fill="var(--color-forms)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
