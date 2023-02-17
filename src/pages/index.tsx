import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Home from '../components/Home'
import { Page } from '../components/common'
import { getThreadsFromFollowedForums } from '../db/database'
import { Thread } from '@/types/app-types'
import { ForumProps } from './f/[...forum]'

export default function Index({ followedThreads }: { followedThreads: ForumProps[] }) {
  return (
    <>
      <Head>
        <title>warechat</title>
      </Head>
      <main>
        <Page>
          <Home followedThreads={followedThreads} />
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

  try {
    const userId = parseInt(session.user.id)
    const followedThreads = await getThreadsFromFollowedForums(userId)
    console.log(followedThreads)
    return {
      props: {
        followedThreads: followedThreads
      }
    }
  } catch {
    return { notFound: true }
  }
}