"use server"

import { google } from "googleapis"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { getGoogleClient } from "@/lib/google"

export async function createGoogleForm(
  formId: string
) {
  try {

    // =========================================
    // AUTH
    // =========================================

    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Não autenticado",
      }
    }

    if (!session.accessToken) {
      return {
        success: false,
        error:
          "Conecte sua conta Google novamente.",
      }
    }

    // =========================================
    // FORM
    // =========================================

    const form = await prisma.form.findFirst({
      where: {
        id: formId,

        // SEGURANÇA:
        // impede acessar formulário
        // de outro usuário
        userId: session.user.id,
      },

      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!form) {
      return {
        success: false,
        error:
          "Formulário não encontrado.",
      }
    }

    // =========================================
    // EVITA DUPLICAR FORM
    // =========================================

    if (form.googleFormUrl) {
      return {
        success: true,
        alreadyCreated: true,
        url: form.googleFormUrl,
      }
    }

    // =========================================
    // VALIDAÇÕES
    // =========================================

    if (!form.questions.length) {
      return {
        success: false,
        error:
          "O formulário não possui perguntas.",
      }
    }

    for (const question of form.questions) {

      const options =
        question.options as string[]

      if (
        !options ||
        !Array.isArray(options)
      ) {
        return {
          success: false,
          error:
            "Pergunta inválida.",
        }
      }

      if (options.length < 2) {
        return {
          success: false,
          error:
            "Uma pergunta precisa ter pelo menos 2 opções.",
        }
      }

      const answer =
        question.correctAnswer?.trim()

      if (
        !["A", "B", "C", "D"].includes(
          answer
        )
      ) {
        return {
          success: false,
          error:
            "Resposta correta inválida.",
        }
      }

      const answerIndex =
        answer.charCodeAt(0) - 65

      if (
        answerIndex < 0 ||
        answerIndex >= options.length
      ) {
        return {
          success: false,
          error:
            "Alternativa correta inválida.",
        }
      }
    }

    // =========================================
    // GOOGLE CLIENT
    // =========================================

    const authClient =
      getGoogleClient(
        session.accessToken
      )

    const forms = google.forms({
      version: "v1",
      auth: authClient,
    })

    // =========================================
    // CREATE FORM
    // =========================================

    const createdForm =
      await forms.forms.create({
        requestBody: {
          info: {
            title: form.title,
            documentTitle:
              form.title,
          },
        },
      })

    const googleFormId =
      createdForm.data.formId

    if (!googleFormId) {
      return {
        success: false,
        error:
          "Erro ao criar formulário.",
      }
    }

    // =========================================
    // TRANSFORMA EM QUIZ
    // =========================================

    await forms.forms.batchUpdate({
      formId: googleFormId,

      requestBody: {
        requests: [
          {
            updateSettings: {
              settings: {
                quizSettings: {
                  isQuiz: true,
                },
              },

              updateMask:
                "quizSettings.isQuiz",
            },
          },
        ],
      },
    })

    // =========================================
    // QUESTIONS
    // =========================================

    await forms.forms.batchUpdate({
      formId: googleFormId,

      requestBody: {
        requests:
          form.questions.map(
            (question, index) => {

              const options =
                question.options as string[]

              const answerIndex =
                question.correctAnswer.charCodeAt(
                  0
                ) - 65

              const correctOption =
                options[answerIndex]

              return {
                createItem: {
                  location: {
                    index,
                  },

                  item: {
                    title:
                      question.question,

                    description:
                     "Faça com atenção, revise as suas respostas antes de enviar. Boa sorte!",

                    questionItem: {
                      question: {
                        required: true,

                        grading: {
                          pointValue: 1,

                          correctAnswers:
                            {
                              answers: [
                                {
                                  value:
                                    correctOption,
                                },
                              ],
                            },
                        },

                        choiceQuestion: {
                          type: "RADIO",

                          options:
                            options.map(
                              (opt) => ({
                                value: opt,
                              })
                            ),

                          shuffle: false,
                        },
                      },
                    },
                  },
                },
              }
            }
          ),
      },
    })

    // =========================================
    // URL
    // =========================================

    const formUrl =
      `https://docs.google.com/forms/d/${googleFormId}/edit`

    // =========================================
    // SAVE DB
    // =========================================

    await prisma.form.update({
      where: {
        id: form.id,
      },

      data: {
        googleFormId,
        googleFormUrl: formUrl,
      },
    })

    return {
      success: true,
      url: formUrl,
    }

  } catch (error) {

    console.error(
      "GOOGLE FORM ERROR:",
      error
    )

    return {
      success: false,
      error:
        "Erro ao criar Google Forms.",
    }
  }
}