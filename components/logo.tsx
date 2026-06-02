import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

export function Logo({
  className,
  showText = true,
  textClassName,
}: {
  className?: string
  showText?: boolean
  textClassName?: string
}) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm",
          className,
        )}
      >
        <Sparkles className="size-4" aria-hidden="true" />
      </span>
      {showText && (
        <span className={cn("text-lg font-semibold tracking-tight", textClassName)}>
          EduForm <span className="text-primary">AI</span>
        </span>
      )}
    </span>
  )
}
