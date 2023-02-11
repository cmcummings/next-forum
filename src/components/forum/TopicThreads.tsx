import { Thread } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "@/src/pages/f/[...forum]";
import ForumSidebarWrapper from "./ForumSidebarWrapper";
import ThreadPreview from "./ThreadPreview";
import Divider from "../generic/Divider";
import TextLink from "../generic/TextLink";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Button from "../generic/Button";
import Modal from "../generic/Modal";
import TextInput from "../generic/TextInput";
import TextArea from "../generic/TextArea";
import { FormEvent, useState } from "react";
import { createThreadRequest } from "@/src/client/requests";
import { useRouter } from "next/router";

export default function TopicPosts({ forum, topic, threads }: ForumProps) {    
  if (!topic) {
    return <div></div>
  }

  const router = useRouter()

  const [newThreadModalVisible, setNewThreadModalVisible] = useState(false);
  
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [newThreadContent, setNewThreadContent] = useState("")

  function createThread(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (newThreadTitle && newThreadContent && topic) {
      createThreadRequest(forum.id, topic.id, newThreadTitle, newThreadContent).then(threadId => {
        router.push("/f/" + forum.name + "/" + topic.id + "/" + threadId)
      }).catch(console.log)
    }
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
            <div className="flex flex-row justify-between items-end">
              <div className="self-start">
                <h1 className="mt-2 text-3xl">{topic.name}</h1>
                <p>{topic.description}</p>
              </div>
              <div className="self-end">
                <Button onClick={() => setNewThreadModalVisible(s => !s)}>New Thread</Button>
                {newThreadModalVisible 
                  ? <Modal setVisible={setNewThreadModalVisible} className="w-3/5">
                      <h1 className="text-2xl mb-2">New Thread</h1>
                      <form onSubmit={createThread} className="flex flex-col gap-2">
                        <TextInput 
                          placeholder="Title" 
                          value={newThreadTitle} 
                          onChange={(e: FormEvent<HTMLInputElement>) => setNewThreadTitle(e.currentTarget.value)} />
                        <TextArea 
                          placeholder="Content" 
                          rows={3}
                          value={newThreadContent}
                          onChange={(e: FormEvent<HTMLTextAreaElement>) => setNewThreadContent(e.currentTarget.value)} />
                        <Button className="self-end" type="submit">Post</Button>
                      </form>
                    </Modal>
                  : <></>}
              </div>
            </div>
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