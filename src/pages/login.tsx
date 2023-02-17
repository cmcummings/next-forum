import { FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { Page, Container, Divider, TextLink, TextInput, Button } from "../components/common";

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
      <Page>
        <div className="mt-10 md:mx-auto lg:w-1/5">
          <Container className="p-5">
            <h1 className="mb-2">Log in with a warechat account or <TextLink href="/signup">sign up</TextLink>.</h1>
            <Divider/>
            <form onSubmit={login} className="flex flex-col gap-3">
              <TextInput 
                placeholder="Username" 
                value={username} 
                onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} 
                className="" />
              <TextInput 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} 
                className="" />
              <Button type="submit" className="grow-0 self-end">Log in</Button>
            </form>
          </Container>
        </div>
      </Page>
    </>
  )
}