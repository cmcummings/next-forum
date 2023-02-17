import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Home from '../components/Home'
import { Page } from '../components/common'

export default function Index() {
  return (
    <>
      <Head>
        <title>warechat</title>
      </Head>
      <main>
        <Page>
          <Home />
        </Page>
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