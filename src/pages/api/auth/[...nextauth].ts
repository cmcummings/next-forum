import NextAuth, { User, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authorizeUser } from "@/src/db/database"
import { JWT } from "next-auth/jwt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Account',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        if (credentials === undefined) return null

        try {
          const user = await authorizeUser(credentials.username, credentials.password)
          return user 
        } catch(err) {
          console.log(err)
        }

        return null
      }
    })
  ],

  callbacks: {
    async session({ session, token, user }: {session: Session, token: JWT, user: User}): Promise<Session> {
      return session
    }
  },

  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)