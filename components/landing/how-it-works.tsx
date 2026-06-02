const steps = [
  {
    step: "01",
    title: "Preencha o formulário",
    desc: "Informe matéria, tema, série, dificuldade e a quantidade de perguntas desejada.",
  },
  {
    step: "02",
    title: "A IA gera a avaliação",
    desc: "Em segundos, você recebe perguntas, alternativas e gabarito prontos para revisar.",
  },
  {
    step: "03",
    title: "Publique e compartilhe",
    desc: "Crie o Google Form com um clique ou exporte em PDF para aplicar onde quiser.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Da ideia à prova em 3 passos
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Um fluxo simples e intuitivo, pensado para a produtividade de quem ensina.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.step} className="relative rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-6 top-6 hidden text-2xl text-border md:block" aria-hidden="true">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
