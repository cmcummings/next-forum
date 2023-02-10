import ForumHome from "@/src/components/forum/ForumHome"
import Page from "@/src/components/generic/Page"
import TopicThreads from "@/src/components/forum/TopicThreads"
import { getForum, getThread, getTopic, getTopicThreads } from "@/src/db/database"
import { Forum, Thread as IThread, Topic } from "@/types/app-types"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Thread from "@/src/components/forum/Thread"

export interface ForumProps {
  forum: Forum,
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
      const forum = await getForum(ctx.params.forum[0])

      const props: ForumProps = {
        forum: forum
      }

      const topicId = parseInt(ctx.params.forum[1])

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
    console.log(err)
    return { notFound: true }
  }

  return { notFound: true }
}