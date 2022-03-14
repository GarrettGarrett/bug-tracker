import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/contextState'
import BugSearchLogo from '../../components/BugSearchLogo'


export default function SignIn({ csrfToken }) {

  const [guestMode, setGuestMode] = useState(false)

  let context = useAppContext()





return (
    <>
        <html className="h-screen bg-gray-100">
            <body className="h-full">
                <div className="min-h-screen flex flex-col py-auto py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md 0">
                    <div className="w-1/3 md:w-1/2 flex items-center mx-auto">
                      <BugSearchLogo />
                    </div>
                    
                          {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    
                    className="w-14 mx-auto "
                    version="1"
                    viewBox="0 0 810 810"
    >
      <defs>
        <clipPath id="id1">
          <path d="M372 259h403.27v545H372zm0 0"></path>
        </clipPath>
        <clipPath id="id2">
          <path d="M18.813 137H510v503H18.812zm0 0"></path>
        </clipPath>
      </defs>
      <g clipPath="url(#id1)">
        <path
          fill="#4E47E0"
          d="M388.5 579.543l154.809-320.332c38.171 23.91 65.02 61.871 79.254 106.687l81.128-41.796a22.287 22.287 0 0118.7-.848c5.984 2.394 10.812 7.457 12.886 13.695l39.125 116.625c3.934 11.77-2.43 24.516-14.16 28.469-11.785 3.934-24.562-2.406-28.488-14.164l-30.781-91.785-68.547 35.355c2.781 23.246 2.578 47.5-.887 72.149l49.426-15.266c11.758-3.637 24.273 2.848 28.039 14.566l48.562 150.227c3.844 11.8-2.64 24.492-14.449 28.324a22.323 22.323 0 01-16.726-1.176c-5.332-2.574-9.684-7.242-11.602-13.304l-41.766-129.13-53.308 16.509c-4.461 13.898-9.84 27.78-16.457 41.433a315.988 315.988 0 01-26.715 45.313l57.957 9.465c10.852 1.77 18.824 11.16 18.89 22.195l.239 128.633c0 12.426-10.012 22.5-22.453 22.523a22.153 22.153 0 01-9.817-2.23c-7.527-3.614-12.71-11.317-12.726-20.188l-.176-109.582-65.816-10.762c-35.782 35.516-78.453 59.57-122.07 69.38-82.954-49.087-34.286-146.755-32.071-150.985zm0 0"
        ></path>
      </g>
      <path
        fill="#4E47E0"
        d="M334.398 648.3c.254 29.66 8.844 60.735 32.387 86.813-22.77-1.277-45.09-6.593-66.187-16.789-21.047-10.172-39.125-24.39-54.254-41.441 34.992 2.203 64.636-10.313 88.054-28.582zm0 0M746.715 164.781c-29.324-4.601-77.485-6.164-106.793 4.36 25.195 36.136 31.293 82.96 11.61 123.648-3.177 6.633-6.993 12.781-11.231 18.508-21.844-41.082-54.653-74.535-97.059-95.043-42.398-20.5-89.004-25.43-134.734-17.035a113.659 113.659 0 017.472-20.309c20.543-42.523 63.832-67.234 110.051-68.023-11.207-28.797-40.597-63.27-61.472-82.512-6.09-5.61-6.485-15.117-.883-21.195 5.629-6.09 15.117-6.496 21.207-.867 7.199 6.601 61.937 58.48 73.492 108.07 9.914 2.281 19.68 5.523 29.219 10.129a137.178 137.178 0 0131.453 21.043c45.832-23.016 122.543-11.965 132.34-10.39 8.187 1.265 13.726 8.944 12.484 17.124-1.316 8.18-8.945 13.766-17.156 12.492zm0 0"
      ></path>
      <g clipPath="url(#id2)">
        <path
          fill="#4E47E0"
          d="M78.95 305.027l147.866-55.27c11.602-4.28 24.446 1.481 28.856 12.946l20.703 53.317c16.816-18.137 35.297-33.73 54.871-46.223l-15.754-80.067-91.027 32.903c-11.653 4.215-24.512-1.828-28.75-13.488-4.238-11.704 1.82-24.598 13.484-28.82l115.703-41.805c6.133-2.239 12.97-1.66 18.688 1.582a22.553 22.553 0 0111.035 15.238l18.258 93.086c45.078-18.04 92.992-21.02 136.648-5.531l-154.57 319.878c-2.215 4.805-48.48 103.625-138.43 69.102-19.238-39.781-26.87-87.512-21.664-137.027l-53.656-48.82-85.957 67.925a22.475 22.475 0 01-23.762 2.563 21.912 21.912 0 01-7.824-6.313c-7.695-9.734-6.059-23.875 3.7-31.578l100.96-79.727c8.629-6.82 20.965-6.41 29.059 1.012l47.543 43.281c4.87-17.011 11.289-33.957 19.336-50.644 5.949-12.363 12.77-23.942 19.988-35.043l-22.45-57.8-127.081 47.491a22.378 22.378 0 01-17.664-.84c-5.028-2.421-9.133-6.707-11.25-12.363-4.383-11.652 1.53-24.62 13.14-28.965zm0 0"
        ></path>
      </g>
    </svg> */}
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
                            className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                        onClick={()=> signIn("credentials", { username: "manager", password: "" })}
                                        className="w-full inline-flex justify-center py-1.5 px-4 border border-gray-300 rounded-md shadow-sm bg-red-500 text-sm font-medium text-gray-500 hover:bg-red-400"
                                        >
                                            <span className="text-white px-6">Manager</span>
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
                                    <span className="text-white px-6 pt-px">Sign in as a Guest</span>
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
