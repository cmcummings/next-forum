import { Thread } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "@/src/pages/f/[...forum]";
import ForumSidebarWrapper from "./ForumSidebarWrapper";
import ThreadPreview from "./ThreadPreview";
import Divider from "../generic/Divider";
import TextLink from "../generic/TextLink";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

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
          <div>
            <TextLink href={"/f/" + forum.name}><ArrowLongLeftIcon className="w-5 h-5 inline"/> Back to topics</TextLink>
            <h1 className="mt-2 text-3xl">{topic.name}</h1>
            <p>{topic.description}</p>
          </div>
          <Divider />
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