"use client"

import { useEffect, useMemo, useState } from "react"
import {
Check,
Loader2,
Sparkles,
Brain,
FileText,
Wand2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const steps = [
{
title: "Analisando matéria",
icon: Brain,
},
{
title: "Definindo dificuldade",
icon: Wand2,
},
{
title: "Criando perguntas",
icon: FileText,
},
{
title: "Gerando alternativas",
icon: Sparkles,
},
{
title: "Finalizando formulário",
icon: Check,
},
]

export function AiLoading() {
const [current, setCurrent] = useState(0)

useEffect(() => {
const interval = setInterval(() => {
setCurrent((prev) =>
prev < steps.length - 1 ? prev + 1 : prev
)
}, 1400)


return () => clearInterval(interval)

}, [])

const progress = useMemo(() => {
return ((current + 1) / steps.length) * 100
}, [current])

return ( <div className="relative overflow-hidden rounded-3xl border bg-background/80 p-8 shadow-xl backdrop-blur-xl">

  {/* Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

  {/* Floating blur */}
  <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

  <div className="relative z-10">

    {/* Top Icon */}
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
      <div className="relative">
        <Sparkles className="size-10 text-primary" />
        <span className="absolute inset-0 animate-ping">
          <Sparkles className="size-10 text-primary/40" />
        </span>
      </div>
    </div>

    {/* Title */}
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-bold tracking-tight">
        A IA está criando seu formulário
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Gerando perguntas, respostas e estrutura automaticamente...
      </p>
    </div>

    {/* Progress */}
    <div className="mt-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Processando
        </span>

        <span className="font-semibold">
          {Math.round(progress)}%
        </span>
      </div>

      <Progress value={progress} />
    </div>

    {/* Steps */}
    <div className="mt-8 space-y-3">

      {steps.map((step, index) => {
        const active = index === current
        const done = index < current

        const Icon = step.icon

        return (
          <div
            key={step.title}
            className={cn(
              "flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300",
              active &&
                "border-primary/40 bg-primary/5 shadow-md",
              done &&
                "border-green-500/20 bg-green-500/5",
              !active &&
                !done &&
                "opacity-50"
            )}
          >

            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                active &&
                  "bg-primary/10 text-primary",
                done &&
                  "bg-green-500/10 text-green-500",
                !active &&
                  !done &&
                  "bg-muted"
              )}
            >
              {done ? (
                <Check className="size-5" />
              ) : active ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Icon className="size-5" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">
                {step.title}
              </p>

              {active && (
                <p className="text-xs text-muted-foreground">
                  Aguarde alguns segundos...
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>

    {/* Footer */}
    <div className="mt-8 text-center text-xs text-muted-foreground">
      Isso normalmente leva entre 5 e 15 segundos
    </div>
  </div>
</div>


)
}
