import React from 'react'
import TicketList from './TicketList'
import useSWR, { useSWRConfig } from 'swr'
import ShowTicket from './ShowTicket'
import { useState, useEffect } from 'react'
import EditTicket from './EditTicket'
import { useAppContext } from '../context/contextState'
import { parseConfigFileTextToJson } from 'typescript'
import EmptyTicketState from './EmptyTicketState'
import EmptySpaceLottie from './EmptySpaceLottie'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function AllTickets({session}) {
  let context = useAppContext()

    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)
    console.log("🚀 ~ file: AllTickets.js ~ line 19 ~ AllTickets ~ data", data)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const { mutate } = useSWRConfig()
    const [mutateProject, setMutateProject] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
      mutate(`api/getTicketsByUserID/${session?.user?.email}`)
    }, [mutateProject])


    function findProjectByProjectID(projectsArray, projectID){
      console.log("🚀 ~ file: AllTickets.js ~ line 31 ~ findProjectByProjectID ~ projectID", projectID)
      console.log("🚀 ~ file: AllTickets.js ~ line 31 ~ findProjectByProjectID ~ projectsArray", projectsArray)
      let returnObject
      projectsArray.forEach(project  => {
  
        if (parseInt(project.My_ID) == parseInt(projectID)) {
          returnObject = project
        }
      })
      return returnObject
    }

    useEffect(() => {
      console.log("888 use effect for seelected ticket is triggerdd")
      console.log("88888.projectsforuser", data?.ProjectsForUser)
      console.log("88888.ticketsforuser", data?.TicketsForUser)
      if (data?.ProjectsForUser && data?.TicketsForUser[selectedTicket]?.ParentProjectID){
        const selectedProjectObject = findProjectByProjectID(data.ProjectsForUser, data.TicketsForUser[selectedTicket].ParentProjectID)
        setSelectedProject(selectedProjectObject)
      }

    }, [selectedTicket])
    
console.log("88888data", data)
console.log("88888context.showticket", context.showTicket)
console.log("88888.selectedproject", selectedProject)
  return (
    <>
    
      {
        data?.TicketsForUser?.length == 0 && !context.showTicket && 
        <>
        <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">My Tickets</h3>
        <EmptyTicketState fromAllTicketsPage={true}/>
        <div className='h-full flex justify-center '>
          <div className='max-w-lg m-auto'>
            <EmptySpaceLottie />
          </div>

        </div>
        </>
      }

      {
        data?.TicketsForUser?.length > 0 && !context.showTicket && 
        <>
        <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">My Tickets</h3>
        <TicketList
          setSelectedProject={setSelectedProject}
          data={data}
          findProjectByProjectID={findProjectByProjectID}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          showTicket={context.showTicket}
          setShowTicket={context.setShowTicket}
          tickets={data.TicketsForUser}
        />
        </>
        
      }
      {
        data && context.showTicket && selectedProject &&       
        <ShowTicket 
          ticket={data.TicketsForUser[selectedTicket]}
          showTicket={context.showTicket} 
          setShowTicket={context.setShowTicket}
          project={selectedProject}
          session={session}
          mutateProject={mutateProject} 
          setMutateProject={setMutateProject}
          showEdit={showEdit} 
          setShowEdit={setShowEdit}
        />
      }       
    </>
  )
}

export default AllTickets