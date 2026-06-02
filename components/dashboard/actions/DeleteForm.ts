"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DeleteForm(formId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }
    const userId = session.user.id

    // Lógica para deletar o formulário do banco de dados
    // Exemplo usando Prisma:
    await prisma.form.deleteMany({
        where: {
            id: formId,
            userId: userId,
        },
    })
}