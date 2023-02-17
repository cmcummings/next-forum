import ForumHome from "@/src/components/forum/ForumHome"
import { Page } from "@/src/components/common"
import TopicThreads from "@/src/components/forum/TopicThreads"
import { getForum, getThread, getTopic, getTopicThreads, getUserForumDetails } from "@/src/db/database"
import { Forum, Thread as IThread, Topic, UserForumDetails } from "@/types/app-types"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Thread from "@/src/components/forum/Thread"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"

export interface ForumProps {
  forum: Forum,
  user?: UserForumDetails,
  topic?: Topic,
  thread?: IThread,
  threads?: IThread[]
}

export default function ForumPage(forumProps: ForumProps) {
  return (
    <Page>
      {forumProps.topic 
        ? (forumProps.thread 
            ? <Thread {...forumProps} />
            : <TopicThreads {...forumProps} />)
        : <ForumHome {...forumProps} />}
    </Page>  
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (!ctx.params || !ctx.params.forum) {
    return {
      redirect: '/',
      props: {}
    }
  }

  // Routing: /f/[forumName]/[topicId]

  try {
    if(typeof ctx.params.forum !== 'string') {
      const forumName = ctx.params.forum[0]
      const forum = await getForum(forumName)

      const props: ForumProps = {
        forum: forum,
      }

      const session = await getServerSession(ctx.req, ctx.res, authOptions)

      if (session) {
        const userDetails = await getUserForumDetails(forum.id, parseInt(session.user.id))
        props.user = userDetails
      }

      const topicId = parseInt(ctx.params.forum[1])

      // TODO Possible to refactor these into just 2 queries

      if (ctx.params.forum.length >= 2) {
        // /f/[forumName]/[topicId]
        // /f/[forumName]/[topicId]/[threadId]
        // Get topic
        props.topic = await getTopic(topicId)
      }

      if (ctx.params.forum.length == 2) {
        // /f/[forumName]/[topicId]
        // Get threads in topic
        props.threads = await getTopicThreads(topicId)
      } else if (ctx.params.forum.length == 3) {
        // /f/[forumName]/[topicId]/[threadId]
        // Get current thread and its posts
        const threadId = parseInt(ctx.params.forum[2])
        props.thread = await getThread(threadId)
      }

      return {
        props: props
      }
    }
  } catch(err) {
    return { notFound: true }
  }

  return { notFound: true }
}