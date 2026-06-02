"use server"

import { FormData } from "@/components/dashboard/create-form"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function CreateFormIa(
  data: FormData
) {

  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Usuário não autenticado",
    }
  }

  // pega usuário + plano
  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      include: {
        plan: true,
      },
    })

  if (!user || !user.plan) {
    return {
      success: false,
      error: "Plano não encontrado",
    }
  }

  // limite do plano
  if (
    user.formsUsed >=
    user.plan.maxForms
  ) {
    return {
      success: false,

      limitReached: true,

      error:
        "Você atingiu o limite do seu plano.",
    }
  }

  // cria form
  const form = await prisma.form.create({
    data: {
      title: `Quiz de ${data.subject}`,
      subject: data.subject,
      theme: data.theme,
      grade: data.grade,
      difficulty: data.difficulty,
      language: data.language,
      questionType: data.type,
      questionCount: data.count,
      status: "PROCESSING",

      userId: user.id,
    },
  })

  try {

    const prompt = `
Você é um professor especialista.

Gere ${data.count} perguntas sobre:

Matéria: ${data.subject}
Tema: ${data.theme}
Série: ${data.grade}
Dificuldade: ${data.difficulty}
Idioma: ${data.language}

Tipo de pergunta: ${data.type}

REGRAS:
- Gere perguntas educativas
- Gere respostas corretas
- Gere explicações curtas
- Retorne SOMENTE JSON válido
- Não escreva markdown
- Não use crases
- Sempre responder correctAnswer com a letra da opção correta (A, B, C ou D)

Estrutura:

{
  "title": "string",
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`

    const response =
      await openai.chat.completions.create({
        model: "gpt-5-mini",

        messages: [
          {
            role: "system",
            content:
              "Você gera quizzes educacionais em JSON válido.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      })

    const content =
      response.choices[0].message.content

    if (!content) {
      throw new Error(
        "IA não retornou conteúdo"
      )
    }

    const parsed =
      JSON.parse(content)

    // atualiza form
    await prisma.form.update({
      where: {
        id: form.id,
      },

      data: {
        title: parsed.title,
        status: "COMPLETED",
      },
    })

    // salva perguntas
    await prisma.question.createMany({
      data: parsed.questions.map(
        (
          q: {
            question: string
            options: string[]
            correctAnswer: string
            explanation: string
          },
          index: number
        ) => ({
          question: q.question,

          options: q.options,

          correctAnswer:
            q.correctAnswer,

          explanation:
            q.explanation,

          order: index,

          formId: form.id,
        })
      ),
    })

    // salva log IA
    await prisma.aiGeneration.create({
      data: {
        prompt,

        response: parsed,

        tokensUsed:
          response.usage?.total_tokens,

        userId: user.id,
      },
    })

    // incrementa uso
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        formsUsed: {
          increment: 1,
        },
      },
    })

    return {
      success: true,

      formId: form.id,
    }

  } catch (error) {

    await prisma.form.update({
      where: {
        id: form.id,
      },

      data: {
        status: "ERROR",
      },
    })

    console.log(error)

    return {
      success: false,
      error:
        "Erro ao gerar formulário",
    }
  }
}