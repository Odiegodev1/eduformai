import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Como a IA gera as perguntas?",
    a: "Você informa matéria, tema, série e dificuldade. A IA usa esses dados para criar perguntas relevantes, com alternativas e gabarito. Você pode revisar e editar tudo antes de publicar.",
  },
  {
    q: "Preciso de uma conta do Google?",
    a: "Apenas se quiser publicar diretamente no Google Forms. Você pode conectar sua conta Google nas configurações. Também é possível exportar as avaliações em PDF sem conectar nada.",
  },
  {
    q: "Posso editar as perguntas geradas?",
    a: "Sim. Após a geração, você pode editar enunciados, alternativas, marcar a resposta correta, reordenar ou remover perguntas antes de publicar.",
  },
  {
    q: "Quais tipos de pergunta são suportados?",
    a: "Múltipla escolha, verdadeiro ou falso, resposta curta e dissertativa. Você escolhe o tipo ao criar o formulário.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. Não há fidelidade. Você pode mudar de plano ou cancelar quando quiser direto na página de configurações.",
  },
  {
    q: "O conteúdo gerado é confiável?",
    a: "A IA produz conteúdo de alta qualidade, mas recomendamos sempre revisar as perguntas. O controle final é sempre do educador.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Tudo o que você precisa saber antes de começar.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
