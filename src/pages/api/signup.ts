import { registerUser } from "@/src/db/database";
import { NextApiRequest, NextApiResponse } from "next";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const usernameRegex = /^[a-zA-Z0-9_]*$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export default async function handler(req: NextApiRequest & {body: {username: string, password: string, email: string}}, res: NextApiResponse) {  
  const { username, password, email } = req.body
  
  if (req.method !== "POST" || !(username && password && email)) { 
    res.status(400).json({ message: "Invalid request." })
    return
  }

  if(!email.match(emailRegex)) {
    res.status(400).json({ message: "Email is invalid." })
    return
  }

  if(!username.match(usernameRegex)) {
    res.status(400).json({ message: "Username is invalid." })
    return
  }

  if(!password.match(passwordRegex)) {
    res.status(400).json({ message: "Password is invalid." })
    return
  }

  try {
    await registerUser(req.body)
    res.status(200).json({ message: "Registration successful." })
  } catch(err) {
    res.status(500).json({ message: "Could not register user." })
  }
}