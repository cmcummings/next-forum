import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User,
    expires: string
  }

  interface User {
    id: string,
    name: string,
    email: string
  }
}
