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

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const isSignup = mode === "signup"


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(isSignup ? "Conta criada com sucesso!" : "Bem-vindo de volta!")
      router.push("/dashboard")
    }, 1200)
  }

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

      <div className="my-5 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">ou</span>
        <Separator className="flex-1" />
      </div>

   

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignup ? "Já tem uma conta? " : "Ainda não tem conta? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-medium text-primary hover:underline">
          {isSignup ? "Entrar" : "Cadastre-se"}
        </Link>
      </p>

      {isSignup && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Ao criar uma conta você concorda com nossos{" "}
          <Link href="#" className="underline">
            Termos
          </Link>{" "}
          e{" "}
          <Link href="#" className="underline">
            Política de Privacidade
          </Link>
          .
        </p>
      )}
    </div>
  )
}
