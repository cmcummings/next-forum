import { FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import TextInput from "../components/generic/TextInput";
import Button from "../components/generic/Button";
import Page from "../components/generic/Page";
import PageContents from "../components/generic/PageContents";
import Container from "../components/generic/Container";
import Divider from "../components/generic/Divider";

async function signUpRequest(credentials: { username: string, email: string, password: string }): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch("/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status === 200) {
        resolve(true)
      } else {
        reject()
      }
    }).catch(reject)
  })
}

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (username && email && password) {
      signUpRequest({
        username: username,
        password: password,
        email: email
      }).then(() => {
        signIn('credentials', {
          username: username,
          password: password,
          callbackUrl: 'http://localhost:3000'
        }).then(() => {
          console.log("Signed in!")
        })
      }).catch(() => {
        console.log("Failed to sign up!")
      })
    }
  }

  return (
    <>
      <Head>
        <title>sign up - warechat</title>
      </Head>
      <Page>
        <div className="mt-10 md:mx-auto lg:w-1/5">
          <Container>
            <h1 className="mb-2">Register a warechat account.</h1>
            <Divider />
            <form onSubmit={signUp} className="flex flex-col gap-3">
              <TextInput
                placeholder="Username"
                value={username}
                onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                className="" />
              <TextInput
                placeholder="E-mail"
                value={email}
                onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                className="" />
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                className="" />
              <Button type="submit" className="grow-0 self-end">Sign up</Button>
            </form>
          </Container>
        </div>
      </Page>
    </>
  )
}