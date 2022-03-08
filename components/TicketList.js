import moment from 'moment'
import { InformationCircleIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'


export default function TicketList({tickets, showTicket, setShowTicket, setShowProject, setSelectedTicket, showEdit, setShowEdit}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {tickets.map((Ticket, i) => (
          <li 
          onClick={()=> {
            setShowTicket(true)
            setSelectedTicket(i)
          }
        }
          key={Ticket.TicketID}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{Ticket.Title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {Ticket.Priority}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">

                      <InformationCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {Ticket.Type}
                    </p>
                    
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">

                    <p>
                     {moment(Ticket.CreatedAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}