import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { plans } from "@/lib/plans"
import { cn } from "@/lib/utils"

export function PricingSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="precos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {heading && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Planos para cada tipo de educador
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Comece de graça e evolua conforme sua necessidade. Sem fidelidade, cancele quando quiser.
          </p>
        </div>
      )}

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6",
              plan.highlight ? "border-primary shadow-lg shadow-primary/10 lg:scale-[1.03]" : "border-border",
            )}
          >
            {plan.highlight && (
              <Badge className="absolute -top-3 left-6">Mais popular</Badge>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <Button
              asChild
              className="mt-6"
              variant={plan.highlight ? "default" : "outline"}
            >
              <Link href={plan.id === "school" ? "#" : "/signup"}>{plan.cta}</Link>
            </Button>
            <ul className="mt-6 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
