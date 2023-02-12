import { createReply, deletePost, userHasPermissionToDeletePost } from "@/src/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    if (!req.body.postId) {
      res.status(400).json({ message: "Invalid arguments. "})
      return
    }

    const postId = parseInt(req.body.postId)

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in to perform this action." })
      return
    }

    const userId = parseInt(session.user.id)

    const hasPermission = await userHasPermissionToDeletePost(userId, postId)
    if (!hasPermission) {
      res.status(401).json({ message: "You do not have permission to delete this post." })
      return
    }

    try {
      await deletePost(postId)
      res.status(200).end()
    } catch(err) {
      res.status(500).json({ message: err })
    }
    
  } else if (req.method === "POST") {
    if (!(req.body.threadId && req.body.content)) {
      res.status(400).json({ message: "Invalid arguments." })
      return
    }

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in to perform this action." })
      return
    }

    try {
      await createReply(req.body.threadId, parseInt(session.user.id), req.body.content)
      res.status(200).end()
    } catch(err) {
      res.status(500).json({ message: err })
    }
  }
}