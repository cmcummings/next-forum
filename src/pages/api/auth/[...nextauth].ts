import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authorizeUser } from "@/src/db/database"

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
          const res = await authorizeUser(credentials.username, credentials.password)
          if (res) {
            const user: User = {
              id: res.user_id,
              name: res.user_name,
              email: res.email
            }
            return user 
          }
        } catch(err) {
          console.log(err)
        }

        return null
      }
    })
  ],

  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)