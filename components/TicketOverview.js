/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon, TicketIcon } from '@heroicons/react/outline'
import { useState } from 'react'

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

const stats = [
  { id: 1, name: 'Low', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Medium', stat: '58.16%', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'High', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
  { id: 3, name: 'Emergency', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
]

function parseTickets(tickets){
    console.log("🚀 ~ file: TicketOverview.js ~ line 44 ~ parseTickets ~ tickets", tickets)
    let low = 0
    let medium = 0
    let high = 0
    let emergency  = 0
    tickets.forEach(ticket => {
        if (ticket.Priority == "Low"){
            low ++
        }
        if (ticket.Priority == "Medium"){
            medium ++
        }
        if (ticket.Priority == "High"){
            high ++
        }
        if (ticket.Priority == "Emergency"){
            emergency ++
        }
    })
    return [
        {
            title: "Low",
            count: low,
            percent:Math.floor((low / tickets.length) * 100),
            color: "bg-yellow-400"
        },
       {
            title: "Medium",
            count: medium,
            percent:Math.floor((medium / tickets.length) * 100),
            color: "bg-blue-400"
        },
        {
            title: "High",
            count: high,
            percent:Math.floor((high / tickets.length) * 100),
            color: "bg-red-400"
        },
        {
            title: "Emergency",
            count: emergency,
            percent:Math.floor((emergency / tickets.length) * 100),
            color: "bg-red-600"
        },
    ]
}





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketOverView({tickets}) {
    const [priorityStats, setPriorityState] = useState(parseTickets(tickets))
    console.log("🚀 ~ file: TicketOverview.js ~ line 72 ~ TicketOverView ~ priorityStats", priorityStats)
   
    
return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Tickets by Priority</h3>

      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {priorityStats.map((item) => (
          <div
            key={getRandomID()}
            className="relative bg-white pt-5 px-4 pb-0 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`${item.color} absolute rounded-md p-3`}>
                    <TicketIcon className="h-6 w-6 text-white" aria-hidden="true" />               
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.title}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.count}</p>
              <p
                className={classNames(
                  item.percent < 33 ? 'text-green-600' 
                  : 
                  item.percent > 33 && item.percent < 66 ? 'text-purple-600' 
                  :
                  'text-red-600' ,
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              > 
              

              <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {(item.percent)} %
             </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}