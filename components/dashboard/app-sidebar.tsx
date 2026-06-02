"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Clock,
  CreditCard,
  LayoutDashboard,
  Plus,
  Settings,
  Sparkles,
  Crown,
} from "lucide-react"

import { Logo } from "@/components/logo"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const mainNav = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Criar formulário",
    href: "/dashboard/create",
    icon: Sparkles,
  },

  {
    label: "Histórico",
    href: "/dashboard/history",
    icon: Clock,
  },
]

const accountNav = [
  {
    label: "Planos",
    href: "/dashboard/plans",
    icon: CreditCard,
  },

  {
    label: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface AppSidebarProps {
  maxForms: number
  formsUsed: number

  planName?: string
}

export function AppSidebar({
  maxForms,
  formsUsed,
  planName = "Free",
}: AppSidebarProps) {

  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href)

  // formulários restantes
  const remaining =
    Math.max(maxForms - formsUsed, 0)

  // porcentagem segura
  const percentage =
    maxForms > 0
      ? Math.min(
          (formsUsed / maxForms) * 100,
          100
        )
      : 0

  // se acabou créditos
  const limitReached =
    formsUsed >= maxForms

  return (
    <Sidebar>

      <SidebarHeader className="border-b border-sidebar-border">

        <div className="flex items-center px-2 py-1.5">

          <Link
            href="/dashboard"
            aria-label="EduForm AI"
          >
            <Logo />
          </Link>

        </div>

      </SidebarHeader>

      <SidebarContent>

        {/* BOTÃO NOVO FORM */}
        <SidebarGroup>

          <SidebarGroupContent>

            <div className="px-2 pb-2">

              <Button
                asChild
                className="w-full justify-start"
                disabled={limitReached}
              >

                <Link
                  href={
                    limitReached
                      ? "/dashboard/plans"
                      : "/dashboard/create"
                  }
                >

                  <Plus className="size-4" />

                  {limitReached
                    ? "Fazer upgrade"
                    : "Novo formulário"}

                </Link>

              </Button>

            </div>

          </SidebarGroupContent>

        </SidebarGroup>

        {/* MENU */}
        <SidebarGroup>

          <SidebarGroupLabel>
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {mainNav.map((item) => (

                <SidebarMenuItem key={item.href}>

                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >

                    <Link href={item.href}>

                      <item.icon className="size-4" />

                      <span>{item.label}</span>

                    </Link>

                  </SidebarMenuButton>

                </SidebarMenuItem>

              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

        {/* CONTA */}
        <SidebarGroup>

          <SidebarGroupLabel>
            Conta
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {accountNav.map((item) => (

                <SidebarMenuItem key={item.href}>

                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >

                    <Link href={item.href}>

                      <item.icon className="size-4" />

                      <span>{item.label}</span>

                    </Link>

                  </SidebarMenuButton>

                </SidebarMenuItem>

              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* FOOTER PLANO */}
      <SidebarFooter className="border-t border-sidebar-border">

        <div className="rounded-xl border bg-sidebar-accent p-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Crown className="size-4 text-yellow-500" />

              <span className="text-sm font-semibold">

                Plano {planName}

              </span>

            </div>

            <span className="text-xs text-muted-foreground">

              {formsUsed}/{maxForms}

            </span>

          </div>

          <div className="mt-3">

            <div className="mb-1 flex items-center justify-between text-xs">

              <span className="text-muted-foreground">
                Créditos restantes
              </span>

              <span className="font-medium">
                {remaining}
              </span>

            </div>

            {/* barra */}
            <div className="h-2 overflow-hidden rounded-full bg-sidebar-border">

              <div
                className={`h-full rounded-full transition-all ${
                  limitReached
                    ? "bg-red-500"
                    : "bg-sidebar-primary"
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

          </div>

          {limitReached ? (

            <div className="mt-3 space-y-2">

              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-xs text-red-500">

                Você atingiu o limite do seu plano.

              </div>

              <Button
                asChild
                size="sm"
                className="w-full"
              >

                <Link href="/dashboard/plans">

                  <Crown className="size-4" />

                  Fazer upgrade

                </Link>

              </Button>

            </div>

          ) : (

            <Button
              asChild
              size="sm"
              variant="outline"
              className="mt-3 w-full bg-transparent"
            >

              <Link href="/dashboard/plans">

                Ver planos

              </Link>

            </Button>

          )}

        </div>

      </SidebarFooter>

    </Sidebar>
  )
}