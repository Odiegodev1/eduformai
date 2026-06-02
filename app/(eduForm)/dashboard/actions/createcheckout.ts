"use server"

import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

import Stripe from "stripe"

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

export async function createCheckoutSession() {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  const checkout =
    await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "subscription",

      customer_email:
        user.email || undefined,

      line_items: [
        {
          price:
            process.env
              .STRIPE_PRICE_ID!,

          quantity: 1,
        },
      ],

      success_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,

      cancel_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/plans?canceled=true`,
    })

  redirect(checkout.url!)
}