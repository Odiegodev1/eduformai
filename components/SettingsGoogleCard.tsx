"use client"

import { useTransition } from "react"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Settings } from "lucide-react"
import { disconnectGoogle, reconnectGoogle } from "./dashboard/actions/google"

interface Props {
  connected: boolean
}

export function SettingsGoogleCard({
  connected,
}: Props) {

  const [loading, startTransition] =
    useTransition()

  function handleToggle() {

    startTransition(async () => {

      if (connected) {

        await disconnectGoogle()

        window.location.reload()

        return
      }

      await reconnectGoogle()

      window.location.reload()
    })
  }

  return (

    <Card>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">
          <Settings className="size-5" />
          Google Forms
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <h3 className="font-medium">

              {connected
                ? "Conta conectada"
                : "Conta desconectada"}

            </h3>

            <p className="text-sm text-muted-foreground">

              {connected
                ? "Seu Google Forms está pronto para uso."
                : "Conecte sua conta Google Forms."}

            </p>

          </div>

          <Button
            variant={
              connected
                ? "destructive"
                : "outline"
            }
            onClick={handleToggle}
            disabled={loading}
          >

            {loading
              ? "Carregando..."
              : connected
              ? "Desconectar"
              : "Conectar"}

          </Button>

        </div>

      </CardContent>

    </Card>
  )
}