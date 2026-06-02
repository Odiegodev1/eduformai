"use client"

import { useState, useTransition } from "react"

import Link from "next/link"

import {
  ArrowLeft,
  Check,
  FileDown,
  FileSpreadsheet,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

import { createGoogleForm } from "@/app/(eduForm)/dashboard/actions/create-google-form"
import { deleteQuestion } from "@/app/(eduForm)/dashboard/actions/Delete"
import { updateQuestion } from "@/app/(eduForm)/dashboard/actions/Update"

interface Question {
  id: string

  question: string

  options: string[]

  correctAnswer: string

  explanation?: string | null
}

interface ResultViewProps {
  data: {
    id: string

    difficulty: string

    grade: string

    title: string

    theme: string

    subject: string

    language: string

    questionType: string

    questionCount: number

    googleFormUrl?: string | null

    questions: Question[]
  }
}

export function ResultView({
  data,
}: ResultViewProps) {

  const [questions, setQuestions] =
    useState<Question[]>(data.questions)

  const [editing, setEditing] =
    useState<Question | null>(null)

  const [publishing, setPublishing] =
    useState(false)

  const [googleFormUrl, setGoogleFormUrl] =
    useState<string | null>(
      data.googleFormUrl || null
    )

  const [isPending, startTransition] =
    useTransition()

 async function removeQuestion(
  id: string
) {

  try {

    await deleteQuestion(id)

    setQuestions((q) =>
      q.filter(
        (item) => item.id !== id
      )
    )

  } catch (error) {

    console.log(error)

    alert("Erro ao remover")
  }
}
 async function saveEdit(
  updated: Question
) {

  try {

    await updateQuestion(updated)

    setQuestions((q) =>
      q.map((item) =>
        item.id === updated.id
          ? updated
          : item
      )
    )

    setEditing(null)

  } catch (error) {

    console.log(error)

    alert("Erro ao atualizar")
  }
}

  async function publishToForms() {

    try {

      setPublishing(true)

      const response =
        await createGoogleForm(data.id)

      if (!response.success) {
        alert("Erro ao criar formulário")
        return
      }

      setGoogleFormUrl(response.url as any)

      alert(
        "Google Forms criado com sucesso!"
      )

      window.open(
        response.url,
        "_blank"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao criar Google Forms"
      )

    } finally {

      setPublishing(false)

    }
  }

  return (
    <>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

        {/* QUESTÕES */}
        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-semibold">
              {questions.length} perguntas geradas
            </h3>

            <Badge
              variant="secondary"
              className="gap-1 text-green-600"
            >
              <Check className="size-3" />

              Pronto para publicar
            </Badge>

          </div>

          {questions.map((q, index) => (

            <Card
              key={q.id}
              className="animate-in fade-in"
            >
              <CardContent className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="font-medium leading-relaxed">

                      <span className="text-muted-foreground">
                        {index + 1}.
                      </span>{" "}

                      {q.question}

                    </p>

                    {q.explanation && (

                      <p className="mt-2 text-sm text-muted-foreground">
                        {q.explanation}
                      </p>

                    )}

                  </div>

                  <div className="flex shrink-0 gap-1">

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() =>
                        setEditing(q)
                      }
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        removeQuestion(q.id)
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>

                  </div>

                </div>

                {/* ALTERNATIVAS */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">

                  {q.options.map((opt, oi) => {

                    const letter =
                      String.fromCharCode(
                        65 + oi
                      )

                    const isCorrect =
                      q.correctAnswer ===
                      letter

                    return (

                      <div
                        key={oi}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",

                          isCorrect
                            ? "border-green-500/40 bg-green-500/10 font-medium text-green-600"
                            : "border-border text-muted-foreground",
                        )}
                      >

                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full border text-xs",

                            isCorrect
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-border",
                          )}
                        >

                          {isCorrect ? (
                            <Check className="size-3" />
                          ) : (
                            letter
                          )}

                        </span>

                        {opt}

                      </div>

                    )
                  })}

                </div>

              </CardContent>
            </Card>

          ))}

        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 lg:self-start">

          <Card>

            <CardContent className="space-y-4 p-5">

              <div>

                <h3 className="font-semibold">
                  {data.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {data.subject} · {data.grade}
                </p>

              </div>

              <div className="space-y-2.5 text-sm">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Perguntas
                  </span>

                  <span className="font-medium">
                    {questions.length}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Dificuldade
                  </span>

                  <span className="font-medium">
                    {data.difficulty}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Idioma
                  </span>

                  <span className="font-medium">
                    {data.language}
                  </span>

                </div>

              </div>

              <div className="space-y-2 pt-2">

                {!googleFormUrl ? (

                  <Button
                    className="w-full"
                    onClick={publishToForms}
                    disabled={
                      publishing ||
                      isPending
                    }
                  >

                    {publishing ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="size-4" />
                    )}

                    Criar no Google Forms

                  </Button>

                ) : (

                  <Button
                    asChild
                    className="w-full"
                  >

                    <a
                      href={googleFormUrl}
                      target="_blank"
                    >

                      <FileSpreadsheet className="size-4" />

                      Abrir Google Forms

                    </a>

                  </Button>

                )}

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                >

                  <FileDown className="size-4" />

                  Exportar PDF

                </Button>

              </div>

            </CardContent>

          </Card>

          <Button
            asChild
            variant="ghost"
            className="mt-3 w-full"
          >

            <Link href="/dashboard/create">

              <ArrowLeft className="size-4" />

              Gerar outro

            </Link>

          </Button>

        </aside>

      </div>

      <EditDialog
        question={editing}
        onClose={() => setEditing(null)}
        onSave={saveEdit}
      />

    </>
  )
}

function EditDialog({
  question,
  onClose,
  onSave,
}: {
  question: Question | null

  onClose: () => void

  onSave: (q: Question) => void
}) {

  const [draft, setDraft] =
    useState<Question | null>(question)

  if (
    question &&
    (!draft || draft.id !== question.id)
  ) {
    setDraft(question)
  }

  return (

    <Dialog
      open={!!question}
      onOpenChange={(open) =>
        !open && onClose()
      }
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Editar pergunta
          </DialogTitle>

          <DialogDescription>
            Ajuste o enunciado e alternativas.
          </DialogDescription>

        </DialogHeader>

        {draft && (

          <div className="space-y-4">

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Pergunta
              </label>

              <Input
                value={draft.question}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    question:
                      e.target.value,
                  })
                }
              />

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Alternativas
              </label>

              {draft.options.map(
                (opt, oi) => {

                  const letter =
                    String.fromCharCode(
                      65 + oi
                    )

                  return (

                    <div
                      key={oi}
                      className="flex items-center gap-2"
                    >

                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            correctAnswer:
                              letter,
                          })
                        }
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs",

                          draft.correctAnswer ===
                            letter
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-border text-muted-foreground",
                        )}
                      >

                        {draft.correctAnswer ===
                        letter ? (
                          <Check className="size-3.5" />
                        ) : (
                          letter
                        )}

                      </button>

                      <Input
                        value={opt}
                        onChange={(e) => {

                          const options = [
                            ...draft.options,
                          ]

                          options[oi] =
                            e.target.value

                          setDraft({
                            ...draft,
                            options,
                          })
                        }}
                      />

                    </div>

                  )
                }
              )}

            </div>

          </div>

        )}

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            onClick={() =>
              draft && onSave(draft)
            }
          >
            Salvar alterações
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}