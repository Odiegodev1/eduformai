"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function getDashboardStats() {

  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const userId = session.user.id

  const [
    formsCreated,
    questionsGenerated,
    formsPublished,
  ] = await Promise.all([

    prisma.form.count({
      where: {
        userId,
      },
    }),

    prisma.question.count({
      where: {
        form: {
          userId,
        },
      },
    }),

    prisma.form.count({
      where: {
        userId,
        googleFormUrl: {
          not: null,
        },
      },
    }),
  ])

  return [
    {
      label: "Formulários criados",
      value: formsCreated,
    },

    {
      label: "Perguntas geradas",
      value: questionsGenerated,
    },

    {
      label: "Publicados no Forms",
      value: formsPublished,
    },
  ]
}