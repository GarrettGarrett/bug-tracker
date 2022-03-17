/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid'
import { useAppContext } from '../context/contextState'

export default function EmptyProjectState({customTitle}) {
  let context = useAppContext()


  return (
    <div className="py-6 bg-white shadow overflow-hidden sm:rounded-md rounded-md">
         <div className="text-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none"  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
</svg>

      <h3 className="mt-2 text-sm font-medium text-gray-900">{customTitle ? customTitle : "No Projects"}</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
      <div className="mt-6">
        <button
        onClick={()=> {
        
            context.setTab(-1)
         
        }}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Project
        </button>
      </div>
    </div>

    </div>
   
  )
}


