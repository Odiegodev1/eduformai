import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ResultView } from "@/components/dashboard/result-view"
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ResultPage({params}:
  {
    params: Promise<{id: string}>
  }
) {
  const {id} = await params
  const formquestions =
await prisma.form.findUnique({
where: {
id,
},

  include: {
    questions: true,
  },
})

if (!formquestions) {
  return (
    <p>Formulário não encontrado</p>
  )
}

console.log(formquestions)

      const session = await auth();
      if(!session){
        return redirect('/login')
      }
        const Userdata = {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            image: session?.user?.image || "",
            
        }
  return (
    <div className="flex min-h-dvh flex-col">
      <DashboardHeader title="Resultado Gerado" user={Userdata}  />
   
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Avaliação gerada</h2>
            <p className="text-sm text-muted-foreground">
              Revise as perguntas, edite o que precisar e publique no Google Forms ou exporte em PDF.
            </p>
          </div>
          <ResultView data={formquestions as any}/>
        </div>
      </main>
    </div>
  )
}
