import { deleteRequest } from "@/src/client/requests"
import { useRouter } from "next/router"

export default function DeletePostLink({ className, postId, redirectLink }: { className: string, postId: number, redirectLink: string }) {
  const router = useRouter()

  function deletePost() {
    deleteRequest(postId).then(() => {
      router.push(redirectLink)
    }).catch(console.log)
  }

  return <h3 className={" text-sky-400 hover:cursor-pointer " + className} onClick={deletePost}>(Delete?)</h3>
}