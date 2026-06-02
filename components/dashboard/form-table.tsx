"use client"

import Link from "next/link"
import {
  Eye,
  FileSpreadsheet,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { StatusBadge } from "./status-badge"
import { FormStatus } from "@/lib/generated/prisma"
import { DeleteForm } from "./actions/DeleteForm"

interface FormItem {
  id: string

  title: string

  subject: string

  grade: string

  questionCount: number

  status: FormStatus

  createdAt: Date | string

  googleFormUrl: string | null
}

interface FormsTableProps {
  forms: FormItem[]
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )
}

async function handleDelete(formId: string) {
  await DeleteForm(formId)
  
}
export function FormsTable({
  forms,
}: FormsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Título</TableHead>

            <TableHead className="hidden md:table-cell">
              Matéria
            </TableHead>

            <TableHead className="hidden lg:table-cell">
              Série
            </TableHead>

            <TableHead className="hidden sm:table-cell">
              Perguntas
            </TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="hidden sm:table-cell">
              Data
            </TableHead>

            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {forms.map((form) => (
            <TableRow
              key={form.id}
              className="transition-colors hover:bg-muted/40"
            >
              <TableCell>
                <Link
                  href={`/dashboard/result/${form.id}`}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {form.title}
                </Link>

                <p className="mt-1 text-xs text-muted-foreground md:hidden">
                  {form.subject}
                </p>
              </TableCell>

              <TableCell className="hidden text-muted-foreground md:table-cell">
                {form.subject}
              </TableCell>

              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {form.grade}
              </TableCell>

              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {form.questionCount}
              </TableCell>

              <TableCell>
                <StatusBadge status={form.status as FormStatus} />
              </TableCell>

              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {formatDate(form.createdAt)}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/result/${form.id}`}
                      >
                        <Eye className="size-4" />
                        Visualizar
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/result/${form.id}`}
                      >
                        <Pencil className="size-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>

                    {form.googleFormUrl && (
                      <DropdownMenuItem asChild>
                        <a
                          href={form.googleFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileSpreadsheet className="size-4" />
                          Abrir no Forms
                        </a>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                    
                    >
                      <Trash2 className="size-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}