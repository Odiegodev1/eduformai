"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

interface UpdateQuestionProps {
  id: string

  question: string

  options: string[]

  correctAnswer: string

  explanation?: string | null
}

export async function updateQuestion(
  data: UpdateQuestionProps
) {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // valida letra correta
  const validAnswers = [
    "A",
    "B",
    "C",
    "D",
  ]

  if (
    !validAnswers.includes(
      data.correctAnswer
    )
  ) {
    throw new Error(
      "Resposta inválida"
    )
  }

  // valida opções
  if (
    !Array.isArray(data.options) ||
    data.options.length < 2
  ) {
    throw new Error(
      "Opções inválidas"
    )
  }

  // verifica se pergunta pertence ao usuário
  const existingQuestion =
    await prisma.question.findFirst({
      where: {
        id: data.id,

        form: {
          userId:
            session.user.id,
        },
      },
    })

  if (!existingQuestion) {
    throw new Error(
      "Pergunta não encontrada"
    )
  }

  await prisma.question.update({
    where: {
      id: data.id,
    },

    data: {
      question:
        data.question.trim(),

      options: data.options,

      correctAnswer:
        data.correctAnswer,

      explanation:
        data.explanation?.trim() ||
        null,
    },
  })

  return {
    success: true,
  }
}