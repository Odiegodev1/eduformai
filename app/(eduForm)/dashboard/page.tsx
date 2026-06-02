import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

import { ActivityChart } from "@/components/dashboard/activity-chart"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { recentForms } from "@/lib/mock-data"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-card"
import { FormsTable } from "@/components/dashboard/form-table"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getDashboardStats } from "./actions/getdashboard"
import { getActivityData } from "@/components/dashboard/actions/getactivity"
import prisma from "@/lib/prisma"

export default async function DashboardPage() {
      const session = await auth();
      console.log(session)
          if(!session){
            return redirect('/login')
          }
            const Userdata = {
                name: session?.user?.name || "",
                email: session?.user?.email || "",
                image: session?.user?.image || "",
                
            }
            const forms = await prisma.form.findMany({
    where: {
      userId: session.user.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  })
            const dataAtivity = await getActivityData()
            const statsDashbard = await getDashboardStats()
      const user = await prisma.user.findUnique({
  where: {
    id: session.user.id,
  },

  include: {
    plan: true,
  },
})

if (!user || !user.plan) {
  return null
}

const remaining =
  user.plan.maxForms -
  user.formsUsed
  return (
    <div className="flex min-h-dvh flex-col">
      <DashboardHeader title="Dashboard" user={Userdata } />
  
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Olá, Maria</h2>
            <p className="text-sm text-muted-foreground">Veja um resumo da sua atividade recente.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="size-4" />
              Criar formulário
            </Link>
          </Button>
        </div>

        <StatsCards  stats={statsDashbard || []}/>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ActivityChart data={dataAtivity } />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comece agora</CardTitle>
              <CardDescription>Atalhos para sua produtividade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/dashboard/create"
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-accent/50"
              >
                <span className="text-sm font-medium">Gerar nova prova com IA</span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
              <Link
                href="/dashboard/history"
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-accent/50"
              >
                <span className="text-sm font-medium">Ver histórico de formulários</span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-accent/50"
              >
                <span className="text-sm font-medium">Conectar Google Forms</span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Últimos formulários</h3>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/history">
                Ver todos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <FormsTable forms={forms.slice(0, 5)} />
        </div>
      </main>
    </div>
  )
}
