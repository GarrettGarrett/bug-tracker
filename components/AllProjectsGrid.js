import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import ShowProject from './ShowProject'
import EditProject from './EditProject'
import { useAppContext } from '../context/contextState'
import ProjectsSkeleton from './ProjectsSkeleton'
import EmptyProjectState from './EmptyProjectState'
import EmptySpaceLottie from './EmptySpaceLottie'

function getRandomID() {
  return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

function getNameFromEmail(str){
  if (str){
    let indexOfAt = str.indexOf("@")
    return str.substring(0, indexOfAt)
  }
}


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))


export default function AllProjectsGrid({session}) {
  let context = useAppContext()
  const { data, error, isValidating } = useSWR(`/api/getProjectsByUser/${session?.user?.email}`, fetcher)

  const [currentProject, setCurrentProject] = useState(null)
  const [showTicket, setShowTicket] = useState(false) //ticket edit
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const { mutate } = useSWRConfig()
  const [mutateProject, setMutateProject] = useState(false)
  
 
  useEffect(() => {
    mutate('/api/getProjects')
  }, [mutateProject])
  

  if (error) return <>error</>
  if (!data) return <ProjectsSkeleton />
  if (data) return (
    <>



      {
        context.showEditProject && 
        <EditProject 
          mutate={mutate}
          mutateProject={mutateProject}
          setMutateProject={setMutateProject}
          setShowEditProject={context.setShowEditProject}
          session={session}
          existingProject={
            context.searchBarSelectedProject == null ?
            data[currentProject]
            :
            context.searchBarSelectedProject
          }
        />
      }
   
      {
        context.showProject && !context.showEditProject && 
        (context.searchBarSelectedProject?.Title != null ||
          data[currentProject]?.Title != null) &&

        <ShowProject 
          projects={data}
          showEditProject={context.showEditProject}
          setShowEditProject={context.setShowEditProject}
          mutateProject={mutateProject} 
          setMutateProject={setMutateProject} 
          showEdit={showEdit} 
          setShowEdit={setShowEdit} 
          session={session} 
          project={
            context.searchBarSelectedProject == null ?
            data[currentProject]
            :
            context.searchBarSelectedProject
          } 
          setShowProject={context.setShowProject} 
          showTicket={showTicket} 
          setShowTicket={setShowTicket} 
          setSelectedTicket={setSelectedTicket} 
          selectedTicket={selectedTicket}
        /> 
        
      }
      {
        !context.showEditProject && !context.showProject ?
          
        <>
        {
          data?.length == 0 &&
          <>
            <h3 className="pb-4 pl-1  text-lg leading-6 font-medium text-gray-900">My Projects</h3>
            <EmptyProjectState />
            <div className='h-full flex justify-center '>
          <div className='max-w-lg m-auto'>
            <EmptySpaceLottie />
          </div>

        </div>
          </>
        }
        { 
        data?.length > 0 &&
<>
<h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">My Projects</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-28">
            <ul role="list" className="divide-y divide-gray-200">
              
            {data.map((project, i) => (
              <li 
              key={getRandomID()}
              onClick={() => {
                context.setShowProject(true)
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
                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                                    src={member.image}
                                  />        
                              )
                            } else {
                              return (
                                <span 
                                key={getRandomID()}
                                className="inline-block h-6 w-6 rounded-full text-sm text-black bg-Timberwolf pl-1.5 pt-px font-bold "  >{member?.email[0].toLocaleUpperCase()}</span>
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

      :

      null
      } 
    
    </>
    
  )
}
