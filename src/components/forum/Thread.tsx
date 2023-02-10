import { ForumProps } from "@/src/pages/f/[...forum]";
import Head from "next/head";
import Container from "../generic/Container";
import Divider from "../generic/Divider";
import AuthorLink from "./AuthorLink";
import ForumSidebarWrapper from "./ForumSidebarWrapper";

export default function Thread({ forum, topic, thread }: ForumProps) {
  if (!(thread && topic && thread.posts)) {
    return <></>
  }

  const op = thread.posts[0]
  const time = new Date(op.timestampPosted)

  return (
    <>
      <Head>
        <title>{forum.name + " - " + topic?.name + " - warechat"}</title>
      </Head>
      <ForumSidebarWrapper {...{forum, topic}}>
        <Container className="p-3">
          <h1 className="text-3xl">{thread.title}</h1>
          <h3 className="text-xl text-slate-400"><AuthorLink {...op.author} /> | {time.toDateString()}</h3>
          <Divider />
          <p>{op.content}</p>
        </Container>
      </ForumSidebarWrapper>
    </>
  )
}