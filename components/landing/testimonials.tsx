import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Marina Costa",
    role: "Professora de Biologia",
    initials: "MC",
    quote:
      "Eu levava horas montando provas. Com o EduForm AI eu crio uma avaliação completa no intervalo entre as aulas. Mudou minha rotina.",
  },
  {
    name: "Rafael Andrade",
    role: "Coordenador pedagógico",
    initials: "RA",
    quote:
      "Padronizamos as avaliações da escola inteira. A integração com o Google Forms economiza um trabalho enorme da nossa equipe.",
  },
  {
    name: "Júlia Santos",
    role: "Criadora de curso online",
    initials: "JS",
    quote:
      "Crio quizzes para cada módulo do meu curso em minutos. Os alunos adoram e o engajamento subiu bastante.",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Educadores já economizam tempo com IA
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Mais de 12.000 professores e criadores confiam no EduForm AI para suas avaliações.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-xl border border-border bg-card p-6">
            <div className="flex gap-0.5 text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-accent text-xs font-medium text-primary">{t.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
