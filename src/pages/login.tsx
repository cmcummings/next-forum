import { FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import TextInput from "../components/generic/TextInput";
import Button from "../components/generic/Button";

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
        <title>login - warechat</title>
      </Head>
      <form onSubmit={login}>
        <TextInput type="text" placeholder="Username" value={username} onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
        <TextInput type="password" placeholder="Password" value={password} onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}/>
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}