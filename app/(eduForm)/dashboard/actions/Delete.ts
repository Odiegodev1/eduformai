"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function deleteQuestion(
  questionId: string
) {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  // verifica ownership
  const question =
    await prisma.question.findFirst({
      where: {
        id: questionId,

        form: {
          userId:
            session.user.id,
        },
      },
    })

  if (!question) {
    throw new Error(
      "Pergunta não encontrada"
    )
  }

  await prisma.question.delete({
    where: {
      id: questionId,
    },
  })

  return {
    success: true,
  }
}