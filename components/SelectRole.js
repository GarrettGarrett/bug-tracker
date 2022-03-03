/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const roles = [
  {
    id: 1,
    name: 'Admin'
  },
  {
    id: 2,
    name: 'Project Manager'
  },
  {
    id: 3,
    name: 'Developer'
  },
  {
    id: 3,
    name: 'User'
  },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function SelectRole({}) {
  const [selected, setSelected] = useState(roles[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="pl-1 block text-xl font-medium text-gray-700">Select a Role</Listbox.Label>
          <div className="mt-1 relative ">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center ">
             
                               
                                <span className='font-bold text-black text-2xl  pl-1'>{selected.name[0].toLocaleUpperCase()}</span>
          

            {
                //   some entries have a name, some only have an email. prase the name out of the email if needed.
                selected?.name ? 
                <span className="ml-3 block truncate text-black">{selected.name}</span>
                :
                <span className="ml-3 block truncate text-black">{selected.email}</span>
                
            }
                
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">


                {roles.map((role) => (
                  <Listbox.Option
                    key={role.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={role}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                            
                        <span className='font-bold text-black text-2xl  pl-1'>{role.name[0].toLocaleUpperCase()}</span>

                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                             
                                {role.name}
                              
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
     
    </Listbox>
  )
}
