"use client"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { CreateFormIa } from "@/app/(eduForm)/dashboard/actions/CreateForm"
import { AiLoading } from "./ai-loading"

const difficulties = ["Fácil", "Média", "Difícil"]

const questionTypes = [
  { value: "multiple", label: "Múltipla escolha" },
  { value: "truefalse", label: "Verdadeiro ou falso" },
  { value: "short", label: "Resposta curta" },
  { value: "essay", label: "Dissertativa" },
]

const languages = ["Português", "Inglês", "Espanhol", "Francês"]

const grades = [
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
  "1º ano EM",
  "2º ano EM",
  "3º ano EM",
  "Superior",
]

const formSchema = z.object({
  subject: z
    .string()
    .min(2, "Digite uma matéria válida"),

  grade: z
    .string()
    .min(1, "Selecione a série"),

  theme: z
    .string()
    .min(5, "Digite um tema válido"),

  type: z
    .string()
    .min(1, "Selecione o tipo"),

  language: z
    .string()
    .min(1, "Selecione o idioma"),

  difficulty: z
    .string()
    .min(1, "Selecione a dificuldade"),

  count: z
    .number()
    .min(5)
    .max(30),
})

export type FormData = z.infer<typeof formSchema>

export function CreateForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      subject: "Biologia",
      grade: "1º ano EM",
      theme: "Citologia e organelas celulares",
      type: "multiple",
      language: "Português",
      difficulty: "Média",
      count: 10,
    },
  })

  const difficulty = watch("difficulty")
  const count = watch("count")

 async function onSubmit(data: FormData) {
  try {

setLoading(true)

const response =
  await CreateFormIa(data)

if(response.limitReached){
  alert("Você atingiu o limite do seu plano. Por favor, atualize seu plano para criar mais formulários.")
  window.location.href = "/dashboard/plans"
  return
  
}

if (!response.success) {
  return
}

// redirect
router.push(
  `/dashboard/result/${response.formId}`
)

} catch (error) {

console.log(error)

} finally {

setLoading(false)

}
}
  return (
    <>
    {loading ? (
        <AiLoading />
    ): (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-6 p-6">

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="subject">
                Matéria
              </Label>

              <Input
                id="subject"
                placeholder="Ex: Biologia"
                {...register("subject")}
              />

              {errors.subject && (
                <p className="text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Série
              </Label>

              <Controller
                control={control}
                name="grade"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem
                          key={g}
                          value={g}
                        >
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.grade && (
                <p className="text-sm text-red-500">
                  {errors.grade.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">
              Tema
            </Label>

            <Input
              id="theme"
              placeholder="Tema"
              {...register("theme")}
            />

            {errors.theme && (
              <p className="text-sm text-red-500">
                {errors.theme.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="space-y-2">
              <Label>
                Tipo de perguntas
              </Label>

              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {questionTypes.map((t) => (
                        <SelectItem
                          key={t.value}
                          value={t.value}
                        >
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Idioma
              </Label>

              <Controller
                control={control}
                name="language"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {languages.map((l) => (
                        <SelectItem
                          key={l}
                          value={l}
                        >
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label>
              Dificuldade
            </Label>

            <div className="grid grid-cols-3 gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() =>
                    setValue("difficulty", d)
                  }
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                    difficulty === d
                      ? "border-primary bg-accent text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between">
              <Label>
                Quantidade de perguntas
              </Label>

              <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-semibold text-primary">
                {count}
              </span>
            </div>

            <Slider
              value={[count]}
              onValueChange={(value) =>
                setValue("count", value[0])
              }
              min={5}
              max={30}
              step={1}
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5</span>
              <span>30</span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
          >
            <Sparkles className="size-4" />
            Gerar com IA
          </Button>
        </CardContent>
      </Card>
    </form>
    )}
    </>
  )
}