import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"



export default NextAuth({
  callbacks: {
    redirect({ url, baseUrl   }) {
      if (url.startsWith(baseUrl)) return "/dashboard"
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    }
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      // from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user'
  }

})