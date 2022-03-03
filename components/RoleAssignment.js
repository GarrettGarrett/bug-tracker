import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import SelectUsers from './SelectUsers'
import SelectRole from './SelectRole'
import AllUsersGrid from './AllUsersGrid'
import { useState, useEffect } from 'react'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

const roles = [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Project Manager'
    },
    {
      id: 3,
      name: 'Developer'
    },
    {
      id: 3,
      name: 'User'
    },
   
  ]

const defaultUser = [{
    name: "Alex",
    image: "/images/alex.jpg",
    email: "alex@email.com"
  }]
  

function RoleAssignment({session}) {
    const { data, error } = useSWR('/api/getUsers', fetcher)
    const { mutate } = useSWRConfig()
    const [selectedRole, setSelectedRole] = useState(roles[0])
    const [selectedUser, setSelectedUser] = useState(data?.length ? data[0] : defaultUser[0])
    const [buttonMessage, setButtonMessage] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [reFetch, setRefetch] = useState(false)
    
    console.log("🚀 ~ file: roleassignment.js ~ line 12 ~ roleassignment ~ data", data)

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

useEffect(() => {
    mutate('/api/getUsers')
}, [reFetch])



    async function handleSubmit(){
        setLoading(true)
        let submitRole = await fetch ('/api/setRole', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...selectedUser, selectedRole}) 
        })

        if (submitRole.ok) {
            setButtonMessage("Updated")
            console.log("🚀 ~ file: RoleAssignment.js ~ line 53 ~ handleSubmit ~ submitRole", submitRole)
        } else {
            setButtonMessage(submitRole.statusText)

        }
        setLoading(false) 
        setRefetch(!reFetch)  //triggers mutate to update swr data     
    }


    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    if (data?.error) return (
    <>
        <div class="flex h-screen">
            <div class="m-auto pb-96">
                <h3 className='text-black text-lg'>{data.error}</h3>
            </div>
        </div>
    </>
    ) 
    
    
    if (!data?.error) return (
        <>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10'>
            
                <div>
                    {/* first column */}
                    <SelectUsers users={data} session={session} selected={selectedUser} setSelected={setSelectedUser}/>

                </div>
            
                <div>
                    {/* second column */}
                    <SelectRole selected={selectedRole} setSelected={setSelectedRole} roles={roles}/>
                </div>
            
                <div className='md:pt-8'>
                    {/* third column */}
                    <button
                        disabled={loading}
                        onClick={()=> handleSubmit()}
                        type="button"
                        className=" w-full items-center text-center py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {
                            !loading ? 
                            buttonMessage
                            :
                            <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="purple" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    
                    </button>
    
                </div>


                </div>

                <div className='pt-4 pb-10'>
                    {/* all users  */}
                    <h1 className='pl-1 py-2 text-xl font-medium text-gray-700'>All Users</h1>
                    <AllUsersGrid users={data}/>
               
                </div>
                   
        </>


    )
   
}

export default RoleAssignment


