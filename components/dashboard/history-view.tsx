"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { FileQuestion, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { recentForms } from "@/lib/mock-data"
import { FormsTable } from "./form-table"

const subjects = ["Todas", "Biologia", "História", "Matemática", "Inglês", "Ciências", "Português"]
const statuses = [
  { value: "all", label: "Todos os status" },
  { value: "published", label: "Publicado" },
  { value: "draft", label: "Rascunho" },
]

export function HistoryView() {
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState("Todas")
  const [status, setStatus] = useState("all")

  const filtered = useMemo(() => {
    return recentForms.filter((form) => {
      const matchQuery = form.title.toLowerCase().includes(query.toLowerCase())
      const matchSubject = subject === "Todas" || form.subject === subject
      const matchStatus = status === "all" || form.status === status
      return matchQuery && matchSubject && matchStatus
    })
  }, [query, subject, status])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por título..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <FormsTable forms={filtered as any} />
      ) : (
        <Empty className="rounded-xl border border-dashed border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Nenhum formulário encontrado</EmptyTitle>
            <EmptyDescription>
              Ajuste os filtros ou crie um novo formulário para começar.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="size-4" />
              Criar formulário
            </Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
