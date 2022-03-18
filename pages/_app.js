import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from '../context/contextState'
import { ChakraProvider } from '@chakra-ui/react'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
      <ThemeProvider attribute="class" >
        <SessionProvider session={session}>
        <AppWrapper>
          <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </AppWrapper>
        </SessionProvider>
      </ThemeProvider>
  )
}