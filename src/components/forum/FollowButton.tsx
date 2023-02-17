import { followRequest } from "@/src/client/requests"
import { useState } from "react"
import { Button } from "../common"


export default function FollowButton({ forumId, initFollowing }: { forumId: number, initFollowing?: boolean | null }) {
  const [following, setFollowing] = useState(initFollowing)

  function toggleFollow() {
    followRequest(forumId, !following).then(updatedFollowing => {
      setFollowing(updatedFollowing)
    }).catch(console.error)
  }

  return <Button onClick={toggleFollow}>{following ? "Unfollow" : "Follow"}</Button>
}