import React from 'react'
import TicketList from './TicketList'
import useSWR, { useSWRConfig } from 'swr'
import ShowTicket from './ShowTicket'
import { useState, useEffect } from 'react'
import EditTicket from './EditTicket'
import { useAppContext } from '../context/contextState'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function AllTickets({session}) {
  let context = useAppContext()

    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const { mutate } = useSWRConfig()
    const [mutateProject, setMutateProject] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
      mutate(`api/getTicketsByUserID/${session?.user?.email}`)
    }, [mutateProject])


    function findProjectByProjectID(projectsArray, projectID){
      let returnObject
      projectsArray.forEach(project  => {
  
        if (parseInt(project.My_ID) == parseInt(projectID)) {
          returnObject = project
        }
      })
      return returnObject
    }

    useEffect(() => {
      if (data?.ProjectsForUser && data?.TicketsForUser[selectedTicket]?.ParentProjectID){
        const selectedProjectObject = findProjectByProjectID(data.ProjectsForUser, data.TicketsForUser[selectedTicket].ParentProjectID)
        setSelectedProject(selectedProjectObject)
      }

    }, [selectedTicket])
    

  return (
    <>

      {
        data && !context.showTicket && 
        <TicketList
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          showTicket={context.showTicket}
          setShowTicket={context.setShowTicket}
          tickets={data.TicketsForUser}
        />
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