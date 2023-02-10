import { ForumProps } from "@/src/pages/f/[...forum]";
import { Post } from "@/types/app-types";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Button from "../generic/Button";
import Container from "../generic/Container";
import Divider from "../generic/Divider";
import TextInput from "../generic/TextInput";
import TextLink from "../generic/TextLink";
import AuthorLink from "./AuthorLink";
import ForumSidebarWrapper from "./ForumSidebarWrapper";

async function replyRequest(threadId: number, content: string) {
  return new Promise((resolve, reject) => {
    fetch('/api/forum/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: threadId,
        content: content
      })
    }).then(res => {
      if (res.status === 200) {
        resolve(true)
      } else {
        reject()
      }
    }).catch(reject)
  })
}

export default function Thread({ forum, topic, thread }: ForumProps) {
  if (!(thread && topic && thread.posts)) {
    return <></>
  }

  const op = thread.posts[0]

  const [replyContent, setReplyContent] = useState("")

  function reply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!replyContent || !thread) return

    replyRequest(thread.id, replyContent).then(() => {

    }).catch(console.log)
  }

  return (
    <>
      <Head>
        <title>{forum.name + " - " + topic?.name + " - warechat"}</title>
      </Head>
      <ForumSidebarWrapper {...{forum, topic}}>
        <TextLink href={"/f/" + forum.name}><ArrowLongLeftIcon className="w-5 h-5 inline"/> Back to {forum.name} / {topic.name}</TextLink>
        <div className="mt-2 flex flex-col gap-2">
          <Container className="p-3">
            <h1 className="text-3xl">{thread.title}</h1>
            <h3 className="text-xl text-slate-400"><AuthorLink {...op.author} /> | {new Date(op.timestampPosted).toDateString()}</h3>
            <Divider />
            <p>{op.content}</p>
          </Container>
          <Container className="p-3">
            <form className="flex flex-col gap-3" onSubmit={reply}>
              <textarea 
                value={replyContent} 
                onChange={(e: FormEvent<HTMLTextAreaElement>) => setReplyContent(e.currentTarget.value)} 
                placeholder="Reply to thread..."
                rows={3}
                className="grow focus:outline-none ring-1 ring-slate-700 focus:ring-2 ring-inset focus:ring-sky-500 rounded-lg bg-transparent p-3" />
              <Button className="self-start" type="submit">Reply</Button>
            </form>
          </Container>
          {
            thread.posts.filter((v, i) => i >= 1).map((post: Post) => (
              <Container className="p-3">
                <h3 className="text-slate-400"><AuthorLink {...post.author} /> | {new Date(post.timestampPosted).toDateString()}</h3>
                <p>{post.content}</p>
              </Container>
            ))
          }
        </div>
      </ForumSidebarWrapper>
    </>
  )
}