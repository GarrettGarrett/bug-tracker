import { useState } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function parseTickets  (tickets) {
    let New = 0
    let Open = 0
    let InProgress = 0
    let Resolved = 0
    let AdditionalInfoRequired = 0

    tickets.forEach(ticket => {
        if (ticket.Status == "New") {
            New ++
        }
        if (ticket.Status == "Open") {
            Open ++
        }
        if (ticket.Status == "InProgress") {
            InProgress ++
        }
        if (ticket.Status == "Resolved") {
            Resolved ++
        }
        if (ticket.Status == "AdditionalInfoRequired") {
            AdditionalInfoRequired ++
        }
    })
    return [
        // {
        //     title: "New",
        //     count: New,
        //     percent:(New / tickets.length),
        //     color: "bg-blue-400"
        // },
        {
            title: "Open",
            count: Open,
            percent:(Open / tickets.length),
            color: "bg-red-400"
        },
        {
            title: "In Progress",
            count: InProgress,
            percent:(InProgress / tickets.length),
            color: "bg-orange-400"
        },
        {
            title: "Resolved",
            count: Resolved,
            percent:(Resolved / tickets.length),
            color: "bg-purple-400"
        },
        {
            title: "Info Required",
            count: AdditionalInfoRequired,
            percent:(AdditionalInfoRequired / tickets.length),
            color: "bg-yellow-400"
        },

    ]
}








export default function TicketStatusOverview({tickets}) {
    const [ticketStatus, setTicketStatus] = useState(parseTickets(tickets))
    console.log("🚀 ~ file: TicketSTatusOverview.js ~ line 78 ~ TicketStatusOverview ~ ticketStatus", ticketStatus)

  return (
    <div className='w-full '>
      <h3 className="py-1 text-lg leading-6 font-medium text-gray-900">Tickets by Status</h3>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ticketStatus.map((ticket) => (
          <li key={ticket.title} className="col-span-1 flex shadow-sm rounded-md">
            <div
              className={classNames(
                ticket.color,
                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md '
              )}
            >
              {ticket.count}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md ">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a className="text-gray-900 font-medium hover:text-gray-600">
                  {ticket.title}
                </a>
                <p className="text-gray-500">{(ticket.percent) * 100} %</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  {/* <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" /> */}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
