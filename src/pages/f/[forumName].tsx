import Topbar from "@/src/components/Topbar"
import { getForum } from "@/src/db/database"
import { serializeForum } from "@/src/serialize"
import { Forum, Topic } from "@/types/app-types"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

export default function ForumPage({ forum }: { forum: Forum }) {
  const router = useRouter()
  const { forumName } = router.query

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
  if (!ctx.params || !ctx.params.forumName) {
    return {
      redirect: '/',
      props: {}
    }
  }

  try {
    if(typeof ctx.params.forumName === 'string') {
      const forum = await getForum(ctx.params.forumName)
      serializeForum(forum)
      
      return {
        props: {
          forum: forum
        }
      }
    } else {
      return { notFound: true }
    }
  } catch {
    return { notFound: true }
  }
}