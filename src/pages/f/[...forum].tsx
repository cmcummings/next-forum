import Topbar from "@/src/components/Topbar"
import { getForum } from "@/src/db/database"
import { Forum, Post, Topic } from "@/types/app-types"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

interface ForumProps {
  forum: Forum,
  topic?: Topic,
  post?: Post
}

export default function ForumPage({ forum, topic, post }: ForumProps) {
  return (
    <>
      <Topbar />
      <div className="lg:mx-80 mt-10">
        <h1 className="text-5xl mb-2">/{forum.name}/</h1>
        <h3 className="text-xl">{forum.description}</h3>

        <div className="mt-5 pt-5 border-t border-slate-500">
          <h3 className="text-xl">Topics</h3>

          <div className="mx-2">
            {forum.topics?.map((topic: Topic) => (
              <button key={topic.id} className="my-2 p-2 border border-slate-700 hover:border-slate-500 text-left w-full">
                <p>{topic.name}</p>
                <p>{topic.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>  
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (!ctx.params || !ctx.params.forum) {
    return {
      redirect: '/',
      props: {}
    }
  }

  // /f/[forumName]/[topicId]/[postId]

  try {
    if(typeof ctx.params.forum !== 'string') {
      const forum = await getForum(ctx.params.forum[0])
      
      const props: ForumProps = {
        forum: forum
      }

      if (ctx.params.forum.length >= 1) {
        
      }

      return {
        props: props
      }
    }
  } catch {
    return { notFound: true }
  }

  return { notFound: true }
}