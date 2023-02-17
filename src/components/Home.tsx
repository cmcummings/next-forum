import { ForumProps } from "../pages/f/[...forum]";
import ThreadPreview from "./forum/ThreadPreview";
import { Divider, PageContents } from "./common";

export default function Home({ followedThreads }: { followedThreads: ForumProps[] }) {
  console.log(followedThreads)
  
  return (
    <>
      <PageContents>
        <h1 className="text-2xl">Latest threads from forums you follow</h1>
        <div className="my-3">
          {followedThreads.map(forumProp => {
            const { forum, topic, thread } = forumProp
            return (
              <ThreadPreview 
                {...forumProp} 
                key={thread?.id}
                link={"/f/" + forum.name + "/" + topic!.id + "/" + thread!.id} />
            )
          })}
        </div>
        <Divider />
      </PageContents>
    </>
  )
}