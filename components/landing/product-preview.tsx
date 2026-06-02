import { Check, FileText, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const questions = [
  {
    q: "Qual é a função principal das mitocôndrias na célula?",
    options: ["Produção de energia (ATP)", "Síntese de proteínas", "Digestão celular", "Armazenamento de DNA"],
    correct: 0,
  },
  {
    q: "O processo de fotossíntese ocorre principalmente em qual organela?",
    options: ["Núcleo", "Cloroplasto", "Ribossomo", "Lisossomo"],
    correct: 1,
  },
]

export function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5 ring-1 ring-border/50">
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-warning/80" />
          <span className="size-3 rounded-full bg-success/80" />
        </div>
        <div className="ml-3 flex-1">
          <div className="mx-auto w-fit rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            app.eduform.ai/criar
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-[1fr_1.3fr]">
        {/* Left: config */}
        <div className="bg-card p-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-primary" />
            Configuração
          </div>
          <div className="mt-5 space-y-4">
            {[
              { label: "Matéria", value: "Biologia" },
              { label: "Tema", value: "Citologia e organelas" },
              { label: "Série", value: "1º ano — Ensino Médio" },
            ].map((field) => (
              <div key={field.label}>
                <div className="mb-1.5 text-xs font-medium text-muted-foreground">{field.label}</div>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">{field.value}</div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1.5 text-xs font-medium text-muted-foreground">Dificuldade</div>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">Média</div>
              </div>
              <div>
                <div className="mb-1.5 text-xs font-medium text-muted-foreground">Perguntas</div>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">10</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              <Sparkles className="size-4" />
              Gerar com IA
            </div>
          </div>
        </div>

        {/* Right: generated questions */}
        <div className="bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="size-4 text-primary" />
              Perguntas geradas
            </div>
            <Badge variant="secondary" className="gap-1 text-success">
              <Check className="size-3" /> Pronto
            </Badge>
          </div>
          <div className="mt-5 space-y-4">
            {questions.map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-medium">
                  {i + 1}. {item.q}
                </p>
                <div className="mt-3 space-y-1.5">
                  {item.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs ${
                        oi === item.correct
                          ? "bg-success/10 font-medium text-success"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`flex size-4 items-center justify-center rounded-full border text-[10px] ${
                          oi === item.correct ? "border-success bg-success text-success-foreground" : "border-border"
                        }`}
                      >
                        {oi === item.correct ? <Check className="size-2.5" /> : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
