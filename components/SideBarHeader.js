import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon,
  XIcon,
  MailIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import Link from 'next/link'
import { useAppContext } from '../context/contextState'
import { useEffect, Fragment, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import SelectUsers from './SelectUsers'
import RoleAssignment from './RoleAssignment'




const sidebarNavigation = [
    { name: 'Home', href: '#', icon: HomeIcon,  index: 1},
    { name: 'Role Assignment', href: '/roleassignment', icon: UserGroupIcon,  index: 2 },
    { name: 'Photos', href: '#', icon: PhotographIcon,  index: 3 },
    { name: 'Shared', href: '#', icon: UserGroupIcon,  index: 4 },
    { name: 'Albums', href: '#', icon: CollectionIcon, index: 5 },
    { name: 'Settings', href: '#', icon: CogIcon, index: 6 },
    { name: 'Messages', href: '/messages', icon: MailIcon, index: 7 },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#', signOut: true },
  ]
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }





function SideBarHeader() {
    let context = useAppContext()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
      const { data: session, status } = useSession()
      const loading = status === "loading"
      const Router = useRouter()
      

      useEffect(() => { //once finished loading, if not authenticated then route to login
        console.log(status)
        console.log(session)
        if (status != "loading"){
          if (status != "authenticated"){
            Router.push("/auth/email-signin")
          }
        }
        }, [status])


      if (typeof window !== "undefined" && loading) return null





  return (
    <>
               {/* Narrow sidebar */}
          <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
            <div className="w-full py-6 flex flex-col items-center">
              <div className="flex-shrink-0 flex items-center">
              <svg
                        fill="white"
                        className="w-9 mx-auto "
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
              </div>
              <div className="flex-1 mt-6 w-full px-2 space-y-1">
                {sidebarNavigation.map((item) => (
                  <Link href={item.href}>
                    <a
                      onClick={() => context.setTab(item.index)}
                      key={item.name}
                      className={classNames(
                        context.tab == item.index ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                        'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                      )}
                      aria-current={context.tab == item.index ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          context.tab == item.index ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                          'h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      <span className="mt-2 text-center">{item.name}</span>
                    </a>
                  </Link>
                  
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-1 right-0 -mr-14 p-1">
                        <button
                          type="button"
                          className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          <span className="sr-only">Close sidebar</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 px-4 flex items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt="Workflow"
                      />
                    </div>
                    <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                      <nav className="h-full flex flex-col">
                        <div className="space-y-1">
                          {sidebarNavigation.map((item) => (
                            <Link href={item.href}>
                            <a
                              onClick={() => context.setTab(item.index)}
                              key={item.name}
                              
                              className={classNames(
                                context.tab == item.index
                                  ? 'bg-indigo-800 text-white'
                                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                                'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                              )}
                              aria-current={context.tab == item.index ? 'page' : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  context.tab == item.index ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                                  'mr-3 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              <span>{item.name}</span>
                            </a>
                            </Link>

                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="w-full">
              <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                <button
                  type="button"
                  className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 flex justify-between px-4 sm:px-6">
                  <div className="flex-1 flex">
                    <form className="w-full flex md:ml-0" action="#" method="GET">
                      <label htmlFor="search-field" className="sr-only">
                        Search all files
                      </label>
                      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                          <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          name="search-field"
                          id="search-field"
                          className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative flex-shrink-0">
                      <div>
                        <Menu.Button className={`${session?.user?.image ? null : "w-10"}  rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                          <span className="sr-only">Open user menu</span>
                          {
                            session?.user?.image ? 
                            // If image, use here
                              <img
                              className="h-8 w-8 rounded-full"
                              src={session?.user?.image  }
                              alt=""
                              />
                              :
                            // if no image, use first letter of name 
                            <span className='font-bold text-black text-2xl mx-auto'>{session?.user?.name[0].toLocaleUpperCase()}</span>

                          }
                          
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                onClick={() => item?.signOut && signOut()}
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      type="button"
                      className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">Add file</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content */}
            <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {/* Primary column */}
                <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
                  
                  {/* Your content */}
                  {
                    context.tab == 1 ?  
                        <>
                            <span className='text-black'>1st tab</span>
                        </>
                   
                    :
                    context.tab == 2 ? 
                        <>
                            <div className="px-5 py-5">
                                <RoleAssignment session={session}/>
                            </div>

                        </>

                    :
                    null
                    }
                </section>
              
              </main>

          
            </div>
            </div>
    </>
  )
}

export default SideBarHeader