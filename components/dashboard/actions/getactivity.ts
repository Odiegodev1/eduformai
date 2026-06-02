"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function getActivityData() {

  const session = await auth()

  if (!session?.user?.id) {
    return []
  }

  const userId = session.user.id

  const forms = await prisma.form.findMany({

    where: {
      userId,
    },

    select: {
      createdAt: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  })

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ]

  const grouped = months.map((month, index) => {

    const total = forms.filter((form) => {

      const formMonth =
        new Date(form.createdAt).getMonth()

      return formMonth === index
    }).length

    return {
      month,
      forms: total,
    }
  })

  return grouped
}