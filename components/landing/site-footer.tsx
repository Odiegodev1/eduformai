import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

const footerLinks = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "#beneficios" },
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Preços", href: "#precos" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Pronto para criar provas em segundos?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-primary-foreground/80">
            Junte-se a milhares de educadores que economizam tempo com o EduForm AI.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7">
            <Link href="/signup">
              Começar agora, é grátis
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-10 border-t border-border py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A forma mais rápida de criar quizzes, provas e formulários educativos com inteligência artificial.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} EduForm AI. Todos os direitos reservados.</p>
          <p>Feito para educadores.</p>
        </div>
      </div>
    </footer>
  )
}
