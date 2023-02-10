import { Thread } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "@/src/pages/f/[...forum]";
import ForumSidebarWrapper from "./ForumSidebarWrapper";
import ThreadPreview from "./ThreadPreview";

export default function TopicPosts({ forum, topic, threads }: ForumProps) {    
  if (!topic) {
    return <div></div>
  }
  
  return (
    <>
      <Head>
        <title>{forum.name + " - " + topic?.name + " - warechat"}</title>
      </Head>
      <ForumSidebarWrapper {...{forum, topic, threads}}>
        <div className="flex gap-2 flex-col">
          {threads 
            ? threads.map((thread: Thread, idx: number) => (
                <ThreadPreview 
                  link={"/f/" + forum.name + "/" + topic.id + "/" + thread.id} 
                  key={idx} {...thread} />
              ))
            : <div>No threads were found on this topic.</div>
          }
        </div>
      </ForumSidebarWrapper>
    </>
  )
}