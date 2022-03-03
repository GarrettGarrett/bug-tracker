import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from '../context/contextState'


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {



  return (
    <AppWrapper>
      <ThemeProvider attribute="class" >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </AppWrapper>
  )
}