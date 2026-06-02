import Link from "next/link"
import type React from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/logo"

const highlights = [
  "Gere provas completas em segundos",
  "Publique direto no Google Forms",
  "Exporte em PDF com gabarito",
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="EduForm AI">
            <Logo />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Brand side */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary-foreground/10 blur-3xl"
          aria-hidden="true"
        />
        <Logo showText textClassName="text-primary-foreground" className="bg-primary-foreground/15" />
        <div>
          <h2 className="max-w-md text-balance text-3xl font-semibold leading-tight">
            A forma mais rápida de criar avaliações educativas com IA.
          </h2>
          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-primary-foreground/90">
                <CheckCircle2 className="size-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-primary-foreground/70">
          “O EduForm AI transformou minha rotina de preparação de provas.” — Marina, professora
        </p>
      </div>
    </div>
  )
}
