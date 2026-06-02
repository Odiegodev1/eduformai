import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { statusLabels } from "@/lib/mock-data"
import { FormStatus } from "@/lib/generated/prisma"

const styles: Record<FormStatus, string> = {
  ERROR: "text-red-500 border-red-500",
  PROCESSING: "text-yellow-500 border-yellow-500",
  COMPLETED: "text-green-500 border-green-500",
}

export function StatusBadge({ status }: { status: FormStatus }) {
  const label = statusLabels[status as keyof typeof statusLabels]
  console.log("StatusBadge renderizado com status:", status, "e label:", label)

  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium", styles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status === "ERROR" && "Falhou"}
      {status === "PROCESSING" && "Processando"}
      {status === "COMPLETED" && "Concluído"}
    </Badge>
  )
}
