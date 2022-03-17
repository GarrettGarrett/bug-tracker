 
const notificationMethods = [
    { id: 'Open', title: 'Open' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Resolved', title: 'Resolved' },
    { id: 'Additional Info Required', title: 'Additional Info Required' },
  ]
  
  export default function AllTicketsFilter({selectedArray, setSelectedArray}) {


    return (
      <div className="">
        {/* <label className="text-base font-medium text-gray-900">Notifications</label> */}
        {/* <p className="text-sm leading-5 text-gray-500">Filter By Status</p> */}
        <fieldset className="mb-5 pl-1">
          <legend className="sr-only">Notification method</legend>
          <div className="sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                  onClick={(e) => {
                      if (!selectedArray.includes(e.target.id)){
                        setSelectedArray([...selectedArray, e.target.id])
                      }
                      if (selectedArray.includes(e.target.id)){
                        //   let newArr = selectedArray.filter(item => item != e.target.id)
                          setSelectedArray(selectedArray.filter(item => item != e.target.id))
                      }
                    }}
                  checked={selectedArray.includes(notificationMethod.id)}
                  id={notificationMethod.id}
                  name="notification-method"
                  type="checkbox"
                  defaultChecked={notificationMethod.id === 'email'}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }
  