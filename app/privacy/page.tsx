import Link from "next/link"

export default function PrivacyPage() {
return ( <main className="min-h-screen bg-background"> <section className="mx-auto max-w-4xl px-6 py-16"> <div className="space-y-6"> <div> <p className="text-sm font-medium text-primary">
EduFormAI </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          Política de Privacidade
        </h1>

        <p className="mt-4 text-muted-foreground">
          Última atualização: Junho de 2026
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              1. Informações coletadas
            </h2>

            <p className="leading-7 text-muted-foreground">
              O EduFormAI coleta informações
              básicas fornecidas pelo login
              Google, incluindo nome, email
              e foto de perfil, além de dados
              relacionados aos formulários
              criados pelo usuário.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              2. Como usamos seus dados
            </h2>

            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                Criar formulários com IA
              </li>

              <li>
                Integrar com Google Forms
              </li>

              <li>
                Melhorar a experiência da plataforma
              </li>

              <li>
                Gerenciar planos e assinaturas
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              3. Compartilhamento
            </h2>

            <p className="leading-7 text-muted-foreground">
              O EduFormAI não vende dados
              pessoais para terceiros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              4. Segurança
            </h2>

            <p className="leading-7 text-muted-foreground">
              Utilizamos práticas modernas
              de segurança, autenticação e
              criptografia para proteger os
              dados dos usuários.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              5. Contato
            </h2>

            <p className="text-muted-foreground">
              suporte@eduformai.com
            </p>
          </section>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/terms"
          className="text-sm text-primary underline"
        >
          Ver Termos de Serviço
        </Link>
      </div>
    </div>
  </section>
</main>


)
}
