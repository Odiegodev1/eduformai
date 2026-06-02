import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface StatsCardsProps {

  stats: {
    label: string
    value: number
  }[]
}

export function StatsCards({
  stats,
}: StatsCardsProps) {

  return (

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {stats.map((stat) => (

        <Card key={stat.label}>

          <CardContent className="p-5">

            <p className="text-sm text-muted-foreground">
              {stat.label}
            </p>

            <div className="mt-2 flex items-end justify-between">

              <span className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </span>

              <span className="flex items-center gap-1 text-xs font-medium text-green-500">

                <TrendingUp className="size-3.5" />

                tempo real
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}