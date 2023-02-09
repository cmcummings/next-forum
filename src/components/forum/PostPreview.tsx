import { Post } from "@/types/app-types";

export default function PostPreview({ id, content, author, timestampPosted }: Post) {
  const time = new Date(timestampPosted)

  return (
    <div className="p-3 mb-2 border rounded-md bg-slate-900 border-slate-900 hover:border-slate-600 hover:cursor-pointer truncate">
      <h3 className="text-xl truncate">{content}</h3>
      <p className="text-slate-400">{time.toDateString()} | <a>{author.name}</a></p>
    </div>
  )
}