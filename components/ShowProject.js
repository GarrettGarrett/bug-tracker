import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import AllUsersGrid from './AllUsersGrid'
import TicketList from './TicketList'
import BreadCrumb from './BreadCrumb'
import {PencilAltIcon } from '@heroicons/react/solid'
import ShowTicket from './ShowTicket'
import EmptyTicketState from './EmptyTicketState'
import { useState } from 'react'
import NewTicket from '../components/NewTicket'


function ShowProject({project, setShowProject, showTicket, setShowTicket, selectedTicket, setSelectedTicket, session, showEdit, setShowEdit, mutateProject, setMutateProject, setShowEditProject, showEditProject}) {

  const [showNewTicket, setShowNewTicket] = useState(false)

  return (
    <>
    {
      showNewTicket && 
      <NewTicket 
        setShowNewTicket={setShowNewTicket}
        showNewTicket={showNewTicket}
      />
    }


    {
      showTicket && !showNewTicket && 
      <ShowTicket 
      mutateProject={mutateProject} 
      setMutateProject={setMutateProject} 
      session={session} 
      showTicket={showTicket} 
      setShowTicket={setShowTicket} 
      ticket={project.Tickets[selectedTicket]} 
      project={project} 
      showEdit={showEdit} 
      setShowEdit={setShowEdit}
      /> 
      
    }


      {
        !showTicket && !showNewTicket &&
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md flex justify-between px-4 py-5 sm:px-6 ">
                <div>
                    <h3 className="pt-6 pb-1 text-lg leading-6 font-medium text-gray-900">{project.Title}</h3>
                    <p className='pb-3 text-black pt-1 text-sm'>{project.Description}</p>
                </div>
            
                <div 
                  onClick={()=> setShowEditProject(true)}
                  className='pt-8'>
                    <PencilAltIcon className='hover:cursor-pointer text-black h-5 pl-4'/>
                    <h1 className='text-gray-500 pl-3 text-sm'>Edit</h1>
                </div>

            </div>



          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              {
                !showTicket && !showNewTicket &&
                <>
                    <h3 className="pl-1 pt-9 pb-1 text-lg leading-6 font-medium text-gray-900"> Users</h3>
                    <AllUsersGrid users={project.Members}/>
                </>
              }
            </div>
        
            <div>
              {
                project?.Tickets?.length > 0 && !showNewTicket &&
                <>
                  <h3 className="md:pt-9 pb-1 pl-1pb-1 text-lg leading-6 font-medium text-gray-900"> Tickets</h3>
                  <TicketList 
                    tickets={project.Tickets} 
                    showTicket={showTicket} 
                    setShowTicket={setShowTicket} 
                    setShowProject={setShowProject} 
                    setSelectedTicket={setSelectedTicket} 
                  />
                </>
              }
                  
                {
                  !showNewTicket && !project?.Tickets?.length &&
                  <div className=''>
                    <h3 className="md:pt-9 pb-1 pl-1pb-1 text-lg leading-6 font-medium text-gray-900"> Tickets</h3>
                    <EmptyTicketState 
                      session={session}
                      showNewTicket={showNewTicket}
                      setShowNewTicket={setShowNewTicket}
                    />
                  </div>
                }
              
              </div>
          </div>
        </>
      }
    </>
  )
}

export default ShowProject