import { ParentProps } from "@/types/app-types";
import { ForumProps } from "@/src/pages/f/[...forum]";

export default function ForumSidebarWrapper({ forum, topic, posts, children, className }: ForumProps & ParentProps) {
  return (
    <div className={className}>
      <div className="flex gap-x-2">
        <div className="flex-1 min-w-0">
          {children}
        </div>
        <div className="flex-none basis-80 hidden md:inline-block">
          <div className="border border-slate-600 bg-slate-900 rounded-md p-5">
            <h1 className="text-4xl">{forum.name}</h1>
            <p className="break-words">{forum.description}</p>
            <div className="border-t my-3 border-slate-600" />
            <h3 className="text-xl">{topic?.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}