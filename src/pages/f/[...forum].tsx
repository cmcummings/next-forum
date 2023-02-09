import ForumHome from "@/src/components/forum/ForumHome"
import Page from "@/src/components/generic/Page"
import TopicPosts from "@/src/components/forum/TopicPosts"
import { getForum, getTopicPosts } from "@/src/db/database"
import { Forum, Post, Topic } from "@/types/app-types"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

export interface ForumProps {
  forum: Forum,
  topic?: Topic,
  posts?: Post[]
}

export default function ForumPage(forumProps: ForumProps) {
  return (
    <Page>
      {forumProps.topic 
        ? <TopicPosts {...forumProps} /> 
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

  // Routing: /f/[forumName]/[topicId]/[postId]

  try {
    if(typeof ctx.params.forum !== 'string') {
      const forum = await getForum(ctx.params.forum[0])
      
      const props: ForumProps = {
        forum: forum
      }
      
      if (ctx.params.forum.length >= 2) {
        const topic = await getTopicPosts(forum.id, parseInt(ctx.params.forum[1]))
        props.topic = topic.topic
        props.posts = topic.posts
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