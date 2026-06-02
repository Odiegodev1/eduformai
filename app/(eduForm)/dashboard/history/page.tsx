import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FormsTable } from "@/components/dashboard/form-table"

export default async function HistoryPage() {

  const session = await auth()

  if (!session?.user?.id) {
    return redirect("/login")
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: session.user.id,
    },
    

    orderBy: {
      createdAt: "desc",

    },
   
  })

  const Userdata = {
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "",
  }

  return (
    <div className="flex min-h-dvh flex-col">

      <DashboardHeader
        title="Histórico"
        user={Userdata}
      />

      <main className="flex-1 p-4 sm:p-6">

        <div className="mx-auto max-w-6xl space-y-6">

          <div>
            <h2 className="text-2xl font-bold">
              Todos os formulários
            </h2>

            <p className="text-muted-foreground text-sm">
              Veja todos os formulários criados com IA.
            </p>
          </div>

          <FormsTable forms={forms} />

        </div>

      </main>
    </div>
  )
}