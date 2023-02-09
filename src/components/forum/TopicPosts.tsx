import { Post } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "@/src/pages/f/[...forum]";
import ForumSidebarWrapper from "./ForumSidebarWrapper";
import PostPreview from "./PostPreview";

export default function TopicPosts({ forum, topic, posts }: ForumProps) {    
  if (!topic) {
    return <div></div>
  }
  
  return (
    <>
      <Head>
        <title>{forum.name} - {topic?.name} - warechat</title>
      </Head>
      <ForumSidebarWrapper className="lg:mx-44 mt-10" {...{forum, topic, posts}}>
        {posts 
          ? posts.map((post: Post, idx: number) => <PostPreview key={idx} {...post} />)
          : <div>No posts were found on this topic.</div>
        }
      </ForumSidebarWrapper>
    </>
  )
}