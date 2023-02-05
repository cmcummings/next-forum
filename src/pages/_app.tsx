import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@fontsource/roboto/400.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /><Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
