import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from '../context/contextState'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
      <ThemeProvider attribute="class" >
        <SessionProvider session={session}>
        <AppWrapper>
          <Component {...pageProps} />
          </AppWrapper>
        </SessionProvider>
      </ThemeProvider>
  )
}