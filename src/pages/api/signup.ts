import { registerUser } from "@/src/db/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method !== "POST" || !(req.body.username && req.body.password && req.body.email)) { 
    res.status(400).json({ message: "Invalid request." })
    return
  }

  registerUser(req.body).then(() => {
    res.status(200).json({ message: "Registration successful." })
  }).catch(() => {
    res.status(500).json({ message: "There was an error registering." })
  })
}