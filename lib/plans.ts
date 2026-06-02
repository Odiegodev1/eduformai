export type Plan = {
  id: "free" | "pro" | "school"
  name: string
  price: string
  period: string
  description: string
  highlight?: boolean
  cta: string
  features: string[]
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Para experimentar e criar suas primeiras avaliações.",
    cta: "Começar grátis",
    features: [
      "5 formulários por mês",
      "Até 10 perguntas por formulário",
      "Exportação em PDF",
      "1 idioma",
      "Suporte por e-mail",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 39",
    period: "/mês",
    description: "Para professores e criadores que avaliam com frequência.",
    highlight: true,
    cta: "Assinar o Pro",
    features: [
      "Formulários ilimitados",
      "Até 50 perguntas por formulário",
      "Integração com Google Forms",
      "Exportação em PDF com gabarito",
      "Todos os idiomas",
      "Histórico completo",
      "Suporte prioritário",
    ],
  },
  {
    id: "school",
    name: "School",
    price: "R$ 149",
    period: "/mês",
    description: "Para escolas e instituições com várias turmas e professores.",
    cta: "Falar com vendas",
    features: [
      "Tudo do plano Pro",
      "Até 20 professores",
      "Espaço de trabalho compartilhado",
      "Banco de questões da instituição",
      "Relatórios e analytics",
      "Gerente de conta dedicado",
    ],
  },
]
