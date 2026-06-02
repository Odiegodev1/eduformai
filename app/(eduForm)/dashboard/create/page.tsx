import { Lightbulb } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreateForm } from "@/components/dashboard/create-form"
import { Card, CardContent } from "@/components/ui/card"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default  async  function CreatePage() {
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
      <DashboardHeader title="Criar Formulario Ia"  user={Userdata}  />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Gerar avaliação com IA</h2>
            <p className="text-sm text-muted-foreground">
              Preencha os campos abaixo e a IA criará perguntas, respostas e gabarito automaticamente.
            </p>
          </div>

          <CreateForm />

          <Card className="border-dashed bg-accent/30">
            <CardContent className="flex gap-3 p-4">
              <Lightbulb className="size-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Dica:</span> quanto mais específico for o tema, mais
                precisas serão as perguntas geradas pela IA.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
