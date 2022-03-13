
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { useState } from 'react'

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

const stats = [
  { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}




function parseTickets (tickets) {
    let Bug = 0
    let Documentation = 0
    let Duplicate = 0
    let Enhancement = 0
    let GoodFirstIssue = 0
    let HelpWanted = 0
    let Invalid = 0
    let Question = 0
    let WontFix = 0
    tickets.forEach(ticket => {
        if (ticket.Type == "Bug") {
            Bug ++
        }
        if (ticket.Type == "Documentation") {
            Documentation ++
        }
        if (ticket.Type == "Duplicate") {
            Duplicate ++
        }
        if (ticket.Type == "Enhancement") {
            Enhancement ++
        }
        if (ticket.Type == "GoodFirstIssue") {
            GoodFirstProject ++
        }
        if (ticket.Type == "HelpWanted") {
            HelpWanted ++
        }
        if (ticket.Type == "Invalid") {
            Invalid ++
        }
        if (ticket.Type == "Question") {
            Question ++
        }
        if (ticket.Type == "WontFix") {
            WontFix ++
        }
    })
    return [
        {
            title: "Bug",
            count: Bug,
            percent:(Bug / tickets.length),
            color: "bg-blue-400"
        },
        {
            title: "Documentation",
            count: Documentation,
            percent:(Documentation / tickets.length),
            color: "bg-yellow-400"
        },
        {
            title: "Duplicate",
            count: Duplicate,
            percent:(Duplicate / tickets.length),
            color: "bg-red-400"
        },
        {
            title: "Enhancement",
            count: Enhancement,
            percent:(Enhancement / tickets.length),
            color: "bg-orange-400"
        },
        {
            title: "Good First Issue",
            count: GoodFirstIssue,
            percent:(GoodFirstIssue / tickets.length),
            color: "bg-purple-400"
        },
        {
            title: "Help Wanted",
            count: HelpWanted,
            percent:(HelpWanted / tickets.length),
            color: "bg-green-400"
        },
        {
            title: "Invalid",
            count: Invalid,
            percent:(Invalid / tickets.length),
            color: "bg-gray-400"
        },
        {
            title: "Question",
            count: Question,
            percent:(Question / tickets.length),
            color: "bg-pink-400"
        },
        {
            title: "Wont    Fix",
            count: WontFix,
            percent:(WontFix / tickets.length),
            color: "bg-blue-400"
        },
       
    ]
}

export default function TicketTypeOverview({tickets}) {
const [typeStats, setTypeStats] = useState(parseTickets(tickets))
console.log("🚀 ~ file: TicketTypeOverview.js ~ line 122 ~ TicketTypeOverview ~ typeStats", typeStats)

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Tickets by Type</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {typeStats.map((item) => (
          <div key={getRandomID()} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.title}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.count}
                {/* <span className="ml-2 text-sm font-medium text-gray-500">from {item.percent}</span> */}
              </div>

              <div
                className={classNames(
                    item.percent < .33 ? 'text-green-600' 
                    : 
                    item.percent > .33 && item.percent < .66 ? 'text-purple-600' 
                    :
                    'text-red-600' ,
                    'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {/* {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )} */}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {(item.percent) * 100} %
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
