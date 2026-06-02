"use client"

import {
  Check,
  Crown,
  Sparkles,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { createCheckoutSession } from "../actions/createcheckout"

const plans = [
  {
    name: "Free",

    price: "R$0",

    description:
      "Ideal para testar a plataforma.",

    features: [
      "5 formulários por mês",
      "Até 10 perguntas",
      "Exportar Google Forms",
      "Suporte básico",
    ],

    current: true,

    button: "Plano Atual",

    icon: Sparkles,
  },

  {
    name: "Pro",

    price: "R$29/mês",

    description:
      "Perfeito para professores e escolas.",

    features: [
      "100 formulários por mês",
      "Perguntas ilimitadas",
      "Google Forms automático",
      "Exportar PDF",
      "Histórico completo",
      "IA mais rápida",
      "Suporte prioritário",
    ],

    popular: true,

    button: "Assinar Pro",

    icon: Crown,

    priceId:
      process.env
        .NEXT_PUBLIC_STRIPE_PRICE_PRO!,
  },
]



export default function PricingPage() {



  return (

    <div className="mx-auto max-w-6xl space-y-10 p-6">

      {/* HEADER */}
      <div className="text-center">

        <Badge className="mb-4">
          EduFormAI
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight">
          Escolha seu plano
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          Crie provas e formulários com IA
          em segundos.
        </p>

      </div>

      {/* PLANOS */}
      <div className="grid gap-6 md:grid-cols-2">

        {plans.map((plan) => {

          const Icon = plan.icon

          return (

            <Card
              key={plan.name}
              className={
                plan.popular
                  ? "relative border-primary shadow-xl"
                  : ""
              }
            >

              {plan.popular && (

                <Badge className="absolute right-4 top-4">
                  Mais popular
                </Badge>

              )}

              <CardHeader className="space-y-4">

                <div className="flex items-center gap-2">

                  <div className="rounded-lg bg-primary/10 p-2">

                    <Icon className="size-5 text-primary" />

                  </div>

                  <CardTitle>
                    {plan.name}
                  </CardTitle>

                </div>

                <div>

                  <h2 className="text-4xl font-bold">
                    {plan.price}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                </div>

              </CardHeader>

              <CardContent className="space-y-6">

                <div className="space-y-3">

                  {plan.features.map(
                    (feature) => (

                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >

                        <Check className="size-4 text-green-500" />

                        <span>
                          {feature}
                        </span>

                      </div>

                    )
                  )}

                </div>

                {plan.current ? (

                  <Button
                    className="w-full"
                    variant="outline"
                    disabled
                  >
                    {plan.button}
                  </Button>

                ) : (

                 <form action={createCheckoutSession}>
  <Button
    type="submit"
    className="w-full"
  >
    Assinar Pro
  </Button>
</form>

                )}

              </CardContent>

            </Card>

          )
        })}

      </div>

      {/* FAQ */}
      <div className="rounded-2xl border bg-card p-8">

        <h2 className="text-2xl font-bold">
          Perguntas frequentes
        </h2>

        <div className="mt-6 space-y-6">

          <div>

            <h3 className="font-semibold">
              Posso cancelar quando quiser?
            </h3>

            <p className="text-sm text-muted-foreground">
              Sim, você pode cancelar seu plano a qualquer momento.
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Os formulários ficam salvos?
            </h3>

            <p className="text-sm text-muted-foreground">
              Sim, todos ficam armazenados no seu histórico.
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Funciona com Google Forms?
            </h3>

            <p className="text-sm text-muted-foreground">
              Sim, integração automática com Google Forms.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}