import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import AllUsersGrid from './AllUsersGrid'
import TicketList from './TicketList'
import BreadCrumb from './BreadCrumb'
import ShowTicket from './ShowTicket'


function ShowProject({project, setShowProject, showTicket, setShowTicket, selectedTicket, setSelectedTicket, session}) {
  console.log("🚀 ~ file: ShowProject.js ~ line 55 ~ ShowProject ~ project", selectedTicket)
  return (
    <>
    {
        showTicket ? <ShowTicket session={session} showTicket={showTicket} setShowTicket={setShowTicket} ticket={project.Tickets[selectedTicket]} project={project}/> 
        : 
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <div>
            
                {/* <BreadCrumb pages={project} current={true}/> */}

                <h3 className="pt-6 pb-1 text-lg leading-6 font-medium text-gray-900">{project.Title}</h3>
                          
                <p className='text-black pt-1 text-sm'>{project.Description}</p>
           
            <h3 className="pl-1 pt-9 pb-1 text-lg leading-6 font-medium text-gray-900"> Users</h3>
            <AllUsersGrid users={project.Members}/>
            

        </div>
    



        <div>
            <h3 className="pt-2 md:pt-28 pb-1 pl-1pb-1 text-lg leading-6 font-medium text-gray-900"> Tickets</h3>
            <TicketList tickets={project.Tickets} showTicket={showTicket} setShowTicket={setShowTicket} setShowProject={setShowProject} setSelectedTicket={setSelectedTicket}/>
    

        </div>


    </div>
    }
       
    
    </>
    
    
  )
}

export default ShowProject