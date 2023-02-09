import { Topic } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "../../pages/f/[...forum]";


export default function ForumHome({ forum }: ForumProps) {
  return (
    <>
      <Head>
        <title>{forum.name + " - warechat"}</title>
      </Head>
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