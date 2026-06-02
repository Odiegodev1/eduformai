import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "./prisma"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({

  secret: process.env.AUTH_SECRET!,

  trustHost: true,

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    Google({

      clientId:
        process.env.AUTH_GOOGLE_ID!,

      clientSecret:
        process.env.AUTH_GOOGLE_SECRET!,

      authorization: {

        params: {

          prompt: "consent",

          access_type: "offline",

          response_type: "code",

          scope:
            "openid email profile https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file",
        },
      },
    }),
  ],

  callbacks: {

    async jwt({
      token,
      account,
    }) {

      if (account?.access_token) {

        token.accessToken =
          account.access_token
      }

      return token
    },

    async session({
      session,
      token,
    }) {

      session.accessToken =
        token.accessToken as string

      if (session.user) {

        session.user.id =
          token.sub as string
      }

      return session
    },
  },
events: {
  async createUser({ user }) {

    const freePlan =
      await prisma.plan.findUnique({
        where: {
          slug: "free",
        },
      })

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        planId: freePlan?.id,
      },
    })
  },
},
  
},

)