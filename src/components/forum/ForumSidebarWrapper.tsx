import { Forum, Topic } from "@/types/app-types";
import Divider from "../generic/Divider";
import Container from "../generic/Container"

export default function ForumSidebarWrapper({ forum, topic, children }: { forum: Forum, topic: Topic, children?: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="lg:mx-44 mt-10">
      <div className="flex gap-x-2">
        <div className="flex-1 min-w-0">
          {children}
        </div>
        <div className="flex-none basis-80 hidden md:inline-block">
          <Container className="p-5">
            <h1 className="text-4xl">{forum.name}</h1>
            <p className="break-words">{forum.description}</p>
          </Container>
        </div>
      </div>
    </div>
  )
}