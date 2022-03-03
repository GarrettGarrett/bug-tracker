import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/contextState'


export default function SignIn({ csrfToken }) {

  const [guestMode, setGuestMode] = useState(false)

  let context = useAppContext()
  console.log("🚀 ~ file: email-signin.js ~ line 11 ~ SignIn ~ test", context)

return (
    <>
        <html className="h-screen bg-gray-100">
            <body className="h-full">
                <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md 0">
                        <svg
                        fill="#4E47E0"
                        className="w-14 mx-auto "
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        enableBackground="new 0 0 512 512"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        >
                        <path d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.981 74.981C26.628 123.332 0 187.62 0 256s26.628 132.668 74.981 181.02C123.333 485.371 187.62 512 256.001 512c68.381 0 132.668-26.629 181.019-74.98C485.371 388.668 512 324.38 512 256s-26.629-132.667-74.98-181.019zm-21.508 340.531c-42.606 42.606-99.256 66.071-159.511 66.071-60.256 0-116.905-23.465-159.511-66.071C53.883 372.905 30.417 316.255 30.417 256S53.882 139.096 96.49 96.489C139.097 53.881 195.745 30.417 256 30.417c55.157 0 107.285 19.674 148.393 55.682l-41.209 41.209C333.145 102.201 295.626 88.522 256 88.522c-92.347 0-167.476 75.13-167.476 167.477S163.654 423.477 256 423.477 423.477 348.346 423.477 256H393.06c0 75.575-61.485 137.06-137.06 137.06S118.942 331.575 118.942 256 180.426 118.94 256 118.94c31.491 0 61.355 10.557 85.569 29.983l-41.528 41.528c-12.914-8.716-28.116-13.405-44.041-13.405-43.535 0-78.953 35.419-78.953 78.953 0 43.534 35.418 78.953 78.953 78.953s78.953-35.419 78.953-78.953h-30.417c0 26.763-21.774 48.536-48.536 48.536S207.465 282.762 207.465 256c0-26.762 21.773-48.536 48.536-48.536 7.716 0 15.152 1.802 21.845 5.183l-32.599 32.599 21.508 21.508 159.147-159.147c36.008 41.109 55.682 93.236 55.682 148.392-.001 60.256-23.466 116.905-66.072 159.513z"></path>
                        <circle cx="396.712" cy="197.712" r="18.423"></circle>
                        </svg>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                
                </div>

                <div className=" mt-8 sm:mx-auto sm:w-5/6 sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="mt-3" method="post" action="/api/auth/signin/email">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        </div>



                        <div>
                        <button
                            type="submit"
                            className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in with Email
                        </button>

                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">

                        <div
                        onClick={() => signIn('github')}
                        >
                            <a
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-gray-500 hover:bg-gray-800"
                            >
                            <span className="sr-only">Sign in with GitHub</span>
                            
                            <svg className="w-5 h-5" aria-hidden="true" fill="white" viewBox="0 0 20 20">
                                <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-white px-5">Sign in with GitHub</span>
                            </a>
                        </div>

                        

                        {
                            guestMode ? 
                            <>
                                        
                                    <div className="flex -my-3 pt-3 hover:cursor-pointer" >
                                            <a
                                            onClick={()=> signIn("credentials", { username: "developer", password: "" })}
                                            className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-orange-500 text-sm font-medium text-gray-500 hover:bg-orange-400"
                                            >
                                                
                                                <span className="text-white px-2.5">Developer</span>
                                            </a>
                                
                                            <a
                                            onClick={()=> signIn("credentials", { username: "admin", password: "" })}
                                            className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-purple-500 text-sm font-medium text-gray-500 hover:bg-purple-400"
                                            >
                                                <span className="text-white px-6">Admin</span>
                                            </a>
                                    </div>


                                    <div className="flex hover:cursor-pointer" >
                                        <a
                                        onClick={()=> signIn("credentials", { username: "user", password: "" })}
                                        className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-green-500 text-sm font-medium text-gray-500 hover:bg-green-400"
                                        >
                                            <span className="text-white px-6">User</span>
                                        </a>

                                        <a
                                        onClick={()=> signIn("credentials", { username: "role2", password: "" })}
                                        className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-red-500 text-sm font-medium text-gray-500 hover:bg-red-400"
                                        >
                                            <span className="text-white px-6">Role2</span>
                                        </a>
                                    </div>
                                
                        
                            </>

                            :
                                <div  >
                                    <a
                                        onClick={()=> {setGuestMode(true)}}
                                        className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-500 text-sm font-medium text-gray-500 hover:bg-blue-400"
                                    >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                    <span className="text-white px-6">Sign in as a Guest</span>
                                        </a>
                                </div>
                        }

                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </body>
    </html>
  </>

)


}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
