import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); 
  const user = await prisma.user.findUnique({
  where: {
    id: session?.user.id,
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
    <TooltipProvider>
    <SidebarProvider>
      <AppSidebar formsUsed={user.plan.maxForms - remaining} maxForms={user.plan.maxForms} planName={user.plan.name} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
    </TooltipProvider>
  )
}
