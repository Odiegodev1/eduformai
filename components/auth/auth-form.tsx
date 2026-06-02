"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GoogleIcon } from "@/components/google-icon"
import { LegalAccept } from "../legal-accept"

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const isSignup = mode === "signup"



  async function handleGoogle() {
    await signIn("google", {redirectTo: "/dashboard"})
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignup ? "Crie sua conta" : "Entrar na sua conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignup
            ? "Comece a criar avaliações com IA gratuitamente."
            : "Que bom te ver de novo. Continue de onde parou."}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogle}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon className="size-4" />
        )}
        Continuar com Google
      </Button>

     
        <div className="mt-4 text-center text-xs text-muted-foreground">
         
              <LegalAccept />
         
          
        </div>
  
    </div>
  )
}
