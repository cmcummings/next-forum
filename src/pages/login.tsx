import { FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (username && password) {
      signIn('credentials', {
        username: username,
        password: password,
        callbackUrl: 'http://localhost:3000'
      }).then(res => {
        if (!res) return
        if (res.ok) {
          console.log("Logged in!")
        }
      })
    }
  }

  return (
    <>
      <Head>
        <title>ware-chat/login</title>
      </Head>
      <form onSubmit={login}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}