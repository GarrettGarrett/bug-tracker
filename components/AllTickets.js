import React from 'react'
import TicketList from './TicketList'
import useSWR, { useSWRConfig } from 'swr'
import ShowTicket from './ShowTicket'
import { useState, useEffect } from 'react'
import EditTicket from './EditTicket'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function AllTickets({session}) {

    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)
    const [showTicket, setShowTicket] = useState(false)
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
        data && !showTicket && 
        <TicketList
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          showTicket={showTicket}
          setShowTicket={setShowTicket}
          tickets={data.TicketsForUser}
        />
      }
      {
        data && showTicket && selectedProject &&       
        <ShowTicket 
          ticket={data.TicketsForUser[selectedTicket]}
          showTicket={showTicket} 
          setShowTicket={setShowTicket}
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