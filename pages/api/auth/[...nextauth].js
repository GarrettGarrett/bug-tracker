import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials";




export default NextAuth({
  session: { strategy: "jwt" }, //this is what enables credentials user/pass to work

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

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let user
        if (credentials.username == "developer") {
          user = { id: 2, name: "developer", email: "" }
          return user
        }if (credentials.username == "admin") {
          user = { id: 2, name: "admin", email: "" }
          return user
        }if (credentials.username == "role1") {
          user = { id: 2, name: "role1", email: "" }
          return user
        }if (credentials.username == "role2") {
          user = { id: 2, name: "role2", email: "" }
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    verifyRequest: '/auth/verify-request', // (used for check email message)
  }

})