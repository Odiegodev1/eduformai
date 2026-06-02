


import {
  Bell,
  Brain,
  LogOut,
  Moon,
  Settings,
  Shield,
  User,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SettingsGoogleCard } from "@/components/SettingsGoogleCard"
import prisma from "@/lib/prisma"

interface SettingsPageProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export default async function SettingsPage({
  user,
}: SettingsPageProps) {

  
  const session = await auth();
  if (!session?.user?.id) {
    return redirect('/login')
  }
  const users = await prisma.user.findUnique({
  where: {
    id: session.user.id,
  },

  select: {
    googleConnected: true,
  },
})
    const userData = {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
    }
 
  return (

    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">

      {/* PERFIL */}
      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Perfil
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <div className="flex items-center gap-4">

            <img
              src={
                userData.image ||
                "/placeholder.svg"
              }
              alt={userData.name}
              className="size-16 rounded-full border"
            />

            <div>

              <h3 className="font-semibold">
                {userData.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {userData.email}
              </p>

            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">

              <Label>Nome</Label>

              <Input
                defaultValue={userData.name}
              />

            </div>

            <div className="space-y-2">

              <Label>Email</Label>

              <Input
                defaultValue={userData.email}
                disabled
              />

            </div>

          </div>

          <Button>
            Salvar alterações
          </Button>

        </CardContent>

      </Card>

      {/* GOOGLE */}
 <SettingsGoogleCard
  connected={users?.googleConnected || false}
/>

      {/* IA */}
   
      {/* APARÊNCIA */}
     
      {/* NOTIFICAÇÕES */}
   

      {/* SEGURANÇA */}
      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Segurança
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

         <Button
        variant="outline"
        className="w-full"
      >

        <LogOut className="size-4" />

        Sair da conta

      </Button>
          <Separator />

          <Button
            variant="destructive"
            className="w-full"
          >
            Excluir conta
          </Button>

        </CardContent>

      </Card>

      {/* SAIR */}
      

    </div>
  )
}