/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle({ticket, setTicket, editedValues, setEditedValues}) {
  const [enabled, setEnabled] = useState(ticket.Status == "Open" ? true : false)

  return (
      <>
        <Switch
            checked={enabled}
            onChange={() => {
                let OpenClosed = enabled ? "Closed" : "Open"
                setTicket({...ticket, Status: OpenClosed})
                setEditedValues({...editedValues, Status: OpenClosed})
                setEnabled(!enabled)
              }}
            className={classNames(
              enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
          
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          />
        </Switch>
      </>
   
  )
}
