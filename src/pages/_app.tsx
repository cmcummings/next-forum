import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@fontsource/roboto/400.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /><Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
