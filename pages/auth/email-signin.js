import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/contextState'
import BugSearchLogo from '../../components/BugSearchLogo'
import LoginLogo from '../../components/LoginLogo'


export default function SignIn({ csrfToken }) {

  const [guestMode, setGuestMode] = useState(false)

  let context = useAppContext()





return (
    <>
        <div className="h-screen bg-Timberwolf">
            <div className="h-full">
                <div className="min-h-screen flex flex-col py-auto py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md 0">
                    <div className="w-1/3 md:w-1/2 flex items-center mx-auto">
                      <BugSearchLogo />
                    </div>
                    

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                
                </div>

                <div className=" mt-8 sm:mx-auto sm:w-5/6 sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    
          <div className="w-56 m-auto pb-2">
            <LoginLogo />
          </div>

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
                            className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-FuzzyWuzzy focus:border-FuzzyWuzzy sm:text-sm"
                            />
                        </div>
                        </div>



                        <div>
                        <button
                            type="submit"
                            className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-Verdigris hover:bg-Verdigris hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Verdigris"
                        >
                            Sign in with Email
                        </button>

                        </div>
                    </form>

                    <div className="mt-4">
                        <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-3">
{/* 
                        <div
                        onClick={() => signIn('github')}
                        >
                            <a
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-FuzzyWuzzy text-sm font-medium text-gray-500 hover:bg-opacity-90"
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
                        </div> */}

                        

                        {
                            guestMode ? 
                            <>
                                        
                                    <div className="flex -my-3 pt-3 hover:cursor-pointer" >
                                            <a
                                            onClick={()=> signIn("credentials", { username: "developer", password: "" })}
                                            className="mr-1 w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-FrenchViolet bg-opacity-80 text-sm font-medium text-gray-500 hover:bg-opacity-90 "
                                            >
                                                
                                                <span className="text-white px-2.5">Developer</span>
                                            </a>
                                
                                            <a
                                            onClick={()=> signIn("credentials", { username: "admin", password: "" })}
                                            className="ml-1 w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-Verdigris bg-opacity-80 text-sm font-medium text-gray-500 hover:bg-opacity-90"
                                            >
                                                <span className="text-white px-6">Admin</span>
                                            </a>
                                    </div>


                                    <div className="flex hover:cursor-pointer " >
                                        <a
                                        onClick={()=> signIn("credentials", { username: "user", password: "" })}
                                        className="mr-1 mt-1 w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-Tan bg-opacity-80 text-sm font-medium text-gray-500 hover:bg-opacity-90"
                                        >
                                            <span className="text-white px-6">User</span>
                                        </a>

                                        <a
                                        onClick={()=> signIn("credentials", { username: "manager", password: "" })}
                                        className="ml-1 mt-1 w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-FuzzyWuzzy bg-opacity-80 text-sm font-medium text-gray-500 hover:bg-opacity-90"
                                        >
                                            <span className="text-white px-6">Manager</span>
                                        </a>
                                    </div>
                                
                        
                            </>

                            :
                                <div  >
                                    <a
                                        onClick={()=> {setGuestMode(true)}}
                                        className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-Tan text-sm font-medium text-gray-500 hover:bg-opacity-90"
                                    >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                    <span className="text-white px-6 pt-px">Sign in as a Guest</span>
                                        </a>
                                </div>
                        }

                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
  </>

)


}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
