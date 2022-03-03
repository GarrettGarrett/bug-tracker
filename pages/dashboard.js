import React from 'react'
import { useEffect } from 'react'
import { useSession, signIn, signOut, getCsrfToken, getProviders,  } from "next-auth/react"
import { getToken } from "next-auth/jwt"

function callback() {

  const { data: session } = useSession()
  const { data } = useSession()
  

useEffect(() => {
  console.log("🚀 ~ file: dashboard.js ~ line 16 ~ callback ~ session", session)

}, [session])


  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default callback