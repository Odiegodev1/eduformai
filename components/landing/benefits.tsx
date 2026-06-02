import { Clock, FileSpreadsheet, FileDown, Languages, ShieldCheck, Wand2 } from "lucide-react"

const benefits = [
  {
    icon: Wand2,
    title: "Geração inteligente",
    desc: "A IA cria perguntas claras, com alternativas e gabarito alinhados ao tema e à série escolhida.",
  },
  {
    icon: Clock,
    title: "Economize horas",
    desc: "Transforme um trabalho de horas em segundos e dedique seu tempo ao que realmente importa: ensinar.",
  },
  {
    icon: FileSpreadsheet,
    title: "Google Forms automático",
    desc: "Publique a prova direto no Google Forms com um clique, pronta para compartilhar com a turma.",
  },
  {
    icon: FileDown,
    title: "Exportação em PDF",
    desc: "Gere uma versão impressa com gabarito separado para aplicar provas presenciais.",
  },
  {
    icon: Languages,
    title: "Vários idiomas",
    desc: "Crie avaliações em português, inglês, espanhol e mais — ideal para cursos de idiomas.",
  },
  {
    icon: ShieldCheck,
    title: "Conteúdo confiável",
    desc: "Revise e edite cada pergunta antes de publicar, mantendo total controle sobre a avaliação.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Tudo o que você precisa para avaliar melhor
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Uma plataforma completa para criar, personalizar e distribuir avaliações educativas com qualidade
          profissional.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary">
              <b.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
