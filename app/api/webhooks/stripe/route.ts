import { headers } from "next/headers"
import { NextResponse } from "next/server"

import Stripe from "stripe"

import prisma from "@/lib/prisma"

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

export async function POST(req: Request) {

  const body = await req.text()

  const signature =
    (await headers()).get(
      "stripe-signature"
    )

  if (!signature) {
    return NextResponse.json(
      {
        error: "Missing signature",
      },
      {
        status: 400,
      }
    )
  }

  let event: Stripe.Event

  try {

    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env
          .STRIPE_WEBHOOK_SECRET!
      )

  } catch (err) {

    return NextResponse.json(
      {
        error:
          "Webhook signature inválida",
      },
      {
        status: 400,
      }
    )
  }

  // PAGAMENTO APROVADO
  if (
    event.type ===
    "checkout.session.completed"
  ) {

    const session =
      event.data.object as Stripe.Checkout.Session

    const email =
      session.customer_email

    if (!email) {
      return NextResponse.json({
        received: true,
      })
    }

    // pega plano PRO
    const proPlan =
      await prisma.plan.findUnique({
        where: {
          slug: "pro",
        },
      })

    if (!proPlan) {
      throw new Error(
        "Plano PRO não encontrado"
      )
    }

    // atualiza usuário
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        planId: proPlan.id,

        formsUsed: 0,

        stripeCustomerId:
          session.customer?.toString(),

        stripeSubscriptionId:
          session.subscription?.toString(),
      },
    })
  }

  // CANCELAMENTO
  if (
    event.type ===
    "customer.subscription.deleted"
  ) {

    const subscription =
      event.data
        .object as Stripe.Subscription

    const freePlan =
      await prisma.plan.findUnique({
        where: {
          slug: "free",
        },
      })

    if (!freePlan) {
      throw new Error(
        "Plano FREE não encontrado"
      )
    }

    await prisma.user.updateMany({
      where: {
        stripeSubscriptionId:
          subscription.id,
      },

      data: {
        planId: freePlan.id,

        formsUsed: 0,

        stripeSubscriptionId:
          null,
      },
    })
  }

  return NextResponse.json({
    received: true,
  })
}