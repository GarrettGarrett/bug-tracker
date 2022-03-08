import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import ShowProject from './ShowProject'

function getNameFromEmail(str){
  if (str){
    let indexOfAt = str.indexOf("@")
    return str.substring(0, indexOfAt)
  }
}


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))


export default function AllProjectsGrid({session}) {
  const { data, error, isValidating } = useSWR('/api/getProjects', fetcher)
  console.log("🚀 ~ file: AllProjectsGrid.js ~ line 19 ~ AllProjectsGrid ~ data", data)
  const [showProject, setShowProject] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [showTicket, setShowTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  if (error) return <>error</>
  if (!data) return <h1>Loading...</h1>
  if (data) return (
    <>
   
      {
        showProject ? <ShowProject showEdit={showEdit} setShowEdit={setShowEdit} session={session} project={data[currentProject]} setShowProject={setShowProject} showTicket={showTicket} setShowTicket={setShowTicket} setSelectedTicket={setSelectedTicket} selectedTicket={selectedTicket}/> 
        
        :
        <>
          <h3 className="pb-1 text-lg leading-6 font-medium text-gray-900">All Projects</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
            {data.map((project, i) => (
              <li 
              onClick={() => {
                setShowProject(true)
                setCurrentProject(i)
              }}
              key={project._id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">{project.Title}</p>

                        </div>
                        <div className="mt-0 flex">
                          <div className="flex items-center text-sm text-gray-500">
                          
                            <p>
                              {project.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
                          {project?.Members?.map(function(member, i) {
                            if (member?.image?.length > 1) {
                              return (
                                  <img
                                    key={member.email}
                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                    src={member.image}
                                  />        
                              )
                            } else {
                              console.log("no image")
                              return (
                                <span 
                                className="inline-block h-6 w-6 rounded-full text-sm text-black bg-purple-200 pl-1.5 pt-px font-bold "  >{member?.email[0].toLocaleUpperCase()}</span>
                              )
                            }
                          })}

                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </>
        
      }
      
   
    
    </>
    
  )
}
