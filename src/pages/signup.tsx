import { FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import TextInput from "../components/generic/TextInput";
import Button from "../components/generic/Button";
import Page from "../components/generic/Page";
import Container from "../components/generic/Container";
import Divider from "../components/generic/Divider";
import { signUpRequest } from "../client/requests";
import TextLink from "../components/generic/TextLink";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState();

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
        })
      }).catch(err => {
        setErrorMsg(err)
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
          <Container className="p-5"> 
            <h1 className="mb-2">Register a warechat account or <TextLink href="/login">log in</TextLink>.</h1>
            <Divider />
            <form onSubmit={signUp} className="flex flex-col gap-3">
              <TextInput
                placeholder="Username"
                value={username}
                onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                className="" />
              <p className="text-slate-400 text-sm">Username must be less than 30 characters and must only contain alphanumeric characters or underscores.</p>

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
              <p className="text-slate-400 text-sm">Password must have at least eight characters, at least one letter, and at least one number</p>

              <p className="text-red-300 text-sm">{errorMsg}</p>

              <Button type="submit" className="grow-0 self-end">Sign up</Button>
            </form>
          </Container>
        </div>
      </Page>
    </>
  )
}