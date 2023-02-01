import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@fontsource/roboto/400.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /><Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
