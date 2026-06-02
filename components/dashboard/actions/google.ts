"use server"

import prisma from "@/lib/prisma"

import { auth, signIn } from "@/lib/auth"

export async function reconnectGoogle() {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Não autenticado")
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },

    data: {
      googleConnected: true,
    },
  })

  return {
    success: true,
  }
}

export async function disconnectGoogle() {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Não autenticado")
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },

    data: {
      googleConnected: false,
    },
  })

  return {
    success: true,
  }
}