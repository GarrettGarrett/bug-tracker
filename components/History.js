/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function History({ticket, project}) {
    const { data, error, isValidating } = useSWR(`/api/getHistory/${project.My_ID}-${ticket.TicketID}`, fetcher)
    const { mutate } = useSWRConfig()
    const [mutateHistory, setMutateHistory] = useState(false)

  console.log("🚀 ~ file: History.js ~ line 62 ~ History ~ ticket", ticket)
  console.log("🚀 ~ file: History.js ~ line 62 ~ History ~ data", data)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (typeof data?.length == "undefined") return <h1>No History</h1>
  if (data?.length > 0) return (
    <div className="flow-root">
    <h3 className="pb-4 bg-transparent text-lg leading-6 font-medium text-gray-900">History</h3>
      <ul role="list" className="-mb-8">
        {data.map((event, eventIdx) => (
          <li key={event.CreatedAt._d}>
            <div className="relative pb-8">
              {eventIdx !== data.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`${
                        eventIdx == 0 ? "bg-red-400" : 
                        eventIdx == 1 ? "bg-blue-400" : 
                        eventIdx == 2 ? "bg-yellow-400" : 
                        eventIdx == 3 ? "bg-purple-400" : 
                        eventIdx == 4 ? "bg-orange-400" : 
                        eventIdx == 5 ? "bg-pink-400" : 
                        eventIdx == 6 ? "bg-emerald-500-400" : 
                        eventIdx == 7 ? "bg-slate-400" : 
                        eventIdx == 8 ? "bg-gray-400" : 
                        eventIdx == 9 ? "bg-amber-900-400" : 
                        "bg-cyan-300-400" } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`
                    }
                  >
                    {/* <event.icon className="h-5 w-5 text-white" aria-hidden="true" /> */}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {`${event.Owner} updated ${event.PropertyChanged} from ${event.OldValue} to ${event.NewValue}`}
                      {/* <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a> */}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {/* <time dateTime={event.datetime}>{event.date}</time> */}
                    <time>{moment(event.CreatedAt._d).fromNow()}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
