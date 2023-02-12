import { createThread } from "@/src/db/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" || !(req.body.forumId && req.body.topicId && req.body.title && req.body.content)) {
    res.status(400).json({ message: "Invalid arguments." })
    return
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in to perform this action."})
    return
  }

  try {
    const threadId = await createThread(req.body.forumId, req.body.topicId, parseInt(session.user.id), req.body.title, req.body.content)
    res.status(200).json({ threadId: threadId })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}