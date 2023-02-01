import { Button, Typography } from '@mui/material'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>ware-chat</title>
        <meta name="description" content="warechat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography>Home page</Typography>
      </main>
    </>
  )
}
