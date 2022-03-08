import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import AllUsersAlpha from './AllUsersAlpha'
import AlphaUsersSearch from './AlphaUsersSearch'
import NewProjectSubmitButtons from './NewProjectSubmitButtons'
import NewProjectSkeleton from './NewProjectSkeleton'
import TicketPriorityDrop from './TicketPriorityDrop'
import TicketTypeDrop from './TicketTypeDrop'
import ComboBox from './ComboBox'
import moment from 'moment'
import { ArrowLeftIcon } from '@heroicons/react/solid'


function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}


const priorities = [
    { id: 1, name: 'Low', color: "bg-yellow-400" },
    { id: 2, name: 'Medium', color: "bg-blue-400" },
    { id: 3, name: 'High', color: "bg-red-400" },
    { id: 4, name: 'Emergency', color: "bg-red-600 animate-ping" },
  
  ]

  const type = [
    { id: 1, name: 'Bug', color: "bg-blue-400" },
    { id: 2, name: 'Documentation', color: "bg-yellow-400" },
    { id: 3, name: 'Duplicate', color: "bg-red-400" },
    { id: 4, name: 'Enhancement', color: "bg-orange-400" },
    { id: 4, name: 'Good First Issue', color: "bg-purple-400"  },
    { id: 4, name: 'Help Wanted', color: "bg-green-400"  },
    { id: 4, name: 'Invalid', color: "bg-gray-400"  },
    { id: 4, name: 'Question', color: "bg-pink-400"  },
    { id: 4, name: 'Wont Fix', color: "bg-blue-100"  },
  
  ]

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function createAlphaObject(data){
    let alphaObject = { //returns this format of data
        // A: [{user object with name starting with a}, {another user object with name starting with a}], 
        // B: [{etc}, {etc}],
    }
    let firstLetterArray = [] //first letters used in alpha categorize list
    // Create list of first letters in user names 
    data.forEach(user => {
       // if non email user, use name field for name:
        if (user?.name) {
            if (!firstLetterArray.includes(user.name[0])) { //if 1st first letter, add letter and user
                firstLetterArray.push(user.name[0])
                alphaObject[user.name[0].toUpperCase()] = [user]
            } else { //if not 1st first letter, add user but not letter 
                alphaObject[user.name[0]].push(user)
                
            }
            
        } else { // if email user, treat email as name:
            if (!firstLetterArray.includes(user.email[0])) {
                firstLetterArray.push(user.email[0])
                alphaObject[user.email[0].toUpperCase()] = [user]
            } else { //if not 1st first letter, add user but not letter 
                alphaObject[user.email[0]].push(user)
                
            }
        }
    })
   

    // now sort a-z
    let sortedAlphaObject = {};
    Object.keys(alphaObject).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach(function(key) {
        sortedAlphaObject[key] = alphaObject[key];
    });
    return sortedAlphaObject
    
}


function getData(endpoint){
    const { data, error, isValidating } = useSWR(endpoint, fetcher)
    const data1 =  { data :data}
    return data1.data
}
    


export default function EditTicket({session, showEdit, setShowEdit, existingTicket, existingProject}) {
console.log("🚀 ~ file: EditTicket.js ~ line 100 ~ EditTicket ~ existingTicket", existingTicket)
    
function getSelectedUserIDs(Members){
    let selectedUserIDs = []
    Members.forEach(member => {
        selectedUserIDs.push(member._id)
    })
    return selectedUserIDs
}

    const { data, error, isValidating } = useSWR('/api/getUsers', fetcher)
    const projects = getData('/api/getProjects')
    const [alphaUsers, setAlphaUsers] = useState(data ? createAlphaObject(data) : null)
    const [alphaUsersFiltered, setAlphaUsersFiltered] = useState(alphaUsers)
    const [searchBar, setSearchBar] = useState(null)
    const [selectedUserID, setSelectedUserID] = useState(getSelectedUserIDs(existingTicket.Members))
    const [ticket, setTicket] = useState({
        Status: existingTicket.Status,
        SubmittedBy: session?.user?.name ? session?.user?.name : getNameFromEmail(session?.user?.email) ,
        History: [],
        Images: [],
        Comments: [],
        updatedAt: moment(),
        CreatedAt: moment(),
        TicketID: existingTicket.TicketID,
        Title: existingTicket.Title,
        Description: existingTicket.Description,
        // Members: [], //added in on submit handle
        Type: existingTicket.Type,
        Priority: existingTicket.Priority,
    })
    const [buttonMessage, setButtonMessage] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState([])
    const [visibleErrorString, setVisibleErrorString] = useState(null)
    const [selectedProjectID, setSelectedProjectID] = useState(projects ? projects[0]._id : null)

    


    useEffect(() => {
        if (projects?.length)
        setSelectedProjectID(projects[0]._id)
    }, [projects])
    


    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setButtonMessage("Submit")
            }, 5000);
        }
    if (buttonMessage != "Submit") {
        sleep()
    }
    }, [buttonMessage])

    function handleInputErrors() {
        // input error control
        setVisibleErrorString(null)
        let errorMsgArray = []
        for (const [key, value] of Object.entries(ticket)) {
            // applies to title, description, type, priority
            if (value.length < 1 && key != "Tickets" && key != "Members" && key!="Comments" && key != "Images" && key!= "History") {
                console.log("77", key, value)
                setVisibleErrorString(`${key} is required`)
                errorMsgArray.push(key)
            }
            // applies to selected users
            if (selectedUserID?.length < 1 && key != "Tickets" ) {
                setVisibleErrorString(`Select at least 1 user`)
                errorMsgArray.push(key)
            }
            // applies to selected project
            if (selectedProjectID?.length < 1 && key != "Tickets" ) {
                setVisibleErrorString(`Select at least 1 project`)
                errorMsgArray.push(key)
            }
        }
        console.log(errorMsgArray)
        return errorMsgArray
        
    }

    async function handleSubmit(){
        let errorsArray = handleInputErrors()
        
        if (errorsArray.length == 0) {
            setLoading(true) //for button loader icon
            // take list of selected user IDs, and add the full user object to project.members
            let selectedUserObjects = []
            selectedUserID.forEach(userID => {
                data.forEach(user => {
                    if (userID == user._id) {
                        selectedUserObjects.push(user)
                        // setProject({...project, Members: [...project.Members, user]})
                    }
                })
            })
            const TicketObject = { //pushed into project tickets array
                ...ticket, 
                Members: selectedUserObjects, 
            }
            const newTicket = await fetch ('/api/newTicket', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...ticket, Members: selectedUserObjects, projectID: selectedProjectID, TicketObject: TicketObject})
            }) 


            if (newTicket.ok) {
                console.log("🚀 ~ file: NewTicket.js ~ line 163 ~ handleSubmit ~ newTicket", newTicket)
                setButtonMessage("Added")
            } else {
                setButtonMessage(newTicket.statusText)

            }
            setLoading(false) //for button loader icon
            // clear form values

            setTicket({
                Status: "Open",
                SubmittedBy: session?.user?.name ? session?.user?.name : getNameFromEmail(session?.user?.email) ,
                History: [],
                Images: [],
                Comments: [],
                updatedAt: moment(),
                CreatedAt: moment(),
                TicketID: getRandomID(),
                Title: '',
                Description: '',
                // Members: [], //added in on submit handle
               
            })
            setSelectedUserID([]) //clear selected users 
           
        }   
    }


    useEffect(() => {
      if (data) {
          let createdAlphaObj = createAlphaObject(data)
            setAlphaUsers(createdAlphaObj)
            setAlphaUsersFiltered(createdAlphaObj)
           
      }
    }, [data])

    function filterUsers(filterTerm) {
        
        let filteredAlpha = []
        data.map(user => {
            let name = user?.name ? user.name : getNameFromEmail(user.email)
            if (name.toLowerCase().includes(filterTerm.toLowerCase())) {
                filteredAlpha.push(user)
            }
        })
        
        setAlphaUsersFiltered(createAlphaObject(filteredAlpha))
    }

    function removeFilter(){
        setAlphaUsersFiltered(alphaUsers)
    }
    

    if (error) return <>error</>
    if (!data) return <NewProjectSkeleton/>
    if (data ) return (
        <>
        <div className='pb-3 border-b border-gray-200 mb-1 '>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Ticket</h3>
                <div 
                onClick={()=> setShowEdit(!showEdit)}
                className=" flex text-center mt-1 max-w-2xl text-sm text-gray-500 pb-4 ">
                    <ArrowLeftIcon className='hover:cursor-pointer h-4 mt-px text-center pr-1'/>
                    Go Back
                </div>


        </div>


        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
{/* First Column */}
            <div>
                    
                    <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:pt-5">
                        
                        {
                            typeof projects != "undefined" && <div className="sm:mt-0 sm:col-span-2 text-black">
                            <ComboBox projects={projects} ticket={ticket} setTicket={setTicket} selectedProjectID={selectedProjectID} setSelectedProjectID={setSelectedProjectID} existingProject={existingProject}/>
                            </div>
                        }
                        
                      
                        
                        <div className="mt-1 sm:mt-0 sm:col-span-2 text-black">
                            <input
                                type="text"
                                value={ticket.Title}
                                onChange={(e) => setTicket({...ticket, Title: e.target.value})}
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:w-full s sm:text-sm border-gray-300 rounded-md"
                                placeholder='Ticket Title'
                            />
                         </div>


   
                        <div className="pt-2 mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                value={ticket.Description}
                                onChange={(e) => setTicket({...ticket, Description: e.target.value})}
                                id="description"
                                name="description"
                                rows={3}
                                className="w-full shadow-sm block text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                defaultValue={''}
                                placeholder='Ticket Description'
                            />
                        </div>

                        

                        <div className="mt-1 sm:mt-0 sm:col-span-2 text-black">
                           <TicketTypeDrop existingTicket={existingTicket} type={type} ticket={ticket} setTicket={setTicket} />
                         </div>

                         <div className="mt-1 sm:mt-0 sm:col-span-2 text-black">
                           <TicketPriorityDrop existingTicket={existingTicket} ticket={ticket} setTicket={setTicket} priorities={priorities}/>
                         </div>
                           
                          
                        </div>
                        
                        <div className='hidden md:block'>
                             <NewProjectSubmitButtons buttonMessage={buttonMessage} loading={loading} visibleErrorString={visibleErrorString} handleSubmit={handleSubmit}/>
                        </div>

            </div>
            
{/* Second Column */}
             <div className=" ">
                <div>
                    <h3 className="pt-6 block text-sm font-medium text-gray-700">Assign to User</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-4">
                        Who will receive this ticket?
                    </p>
                </div>
                {
                    alphaUsersFiltered !== null ?
                    <>
                    <div>
                         <AlphaUsersSearch users={alphaUsers} filterUsers={filterUsers} searchBar={searchBar} setSearchBar={setSearchBar} removeFilter={removeFilter}/>
                        <AllUsersAlpha users={alphaUsersFiltered} selectedUserID={selectedUserID} setSelectedUserID={setSelectedUserID}/>

                    </div>
                       
                    </>
                    : null
                }
             </div>





            
             <div className='pb-36 block md:hidden md:pb-0'>
                    <NewProjectSubmitButtons buttonMessage={buttonMessage} loading={loading} visibleErrorString={visibleErrorString} handleSubmit={handleSubmit}/>
            </div>
         


        </div>

        
        </>
       

       
  
     
    )
  }
  