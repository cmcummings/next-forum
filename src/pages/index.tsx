import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import Topbar from '../components/Topbar'
import Home from '../components/Home'

export default function Index() {
  return (
    <>
      <Head>
        <title>ware</title>
      </Head>
      <main>
        <Topbar />
        <Home />
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