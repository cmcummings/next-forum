import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export default function Home() {
  const { data: session, status } = useSession()

  if (!session) return

  return (
    <>
      <Head>
        <title>ware-chat</title>
      </Head>
      <main>
        <h1 className="font-bold">You're logged in!</h1>
        <p>{session.user.name}</p>
        <p>{session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login'
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}