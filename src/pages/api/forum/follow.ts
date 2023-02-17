import { userFollowForum } from "@/src/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" || !req.body.forumId || req.body.follow === null) {
    res.status(400).json({ message: "Invalid arguments." })
    return
  }

  const forumId = parseInt(req.body.forumId)
  const follow = req.body.follow

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in to perform this action." })
    return
  }

  const userId = parseInt(session.user.id)

  try {
    const following = await userFollowForum(userId, forumId, follow)
    res.status(200).json({ following: following })
  } catch (err) {
    res.status(500).json({ message: "An error occurred." })
  }
}