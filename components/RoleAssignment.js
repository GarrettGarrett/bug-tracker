import React from 'react'
import useSWR from 'swr'
import SelectUsers from './SelectUsers'
import SelectRole from './SelectRole'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))


function RoleAssignment({session}) {
    const { data, error } = useSWR('/api/getUsers', fetcher)
    console.log("🚀 ~ file: roleassignment.js ~ line 12 ~ roleassignment ~ data", data)

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
    
    
    if (data && !data?.error) return (
<>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
    
        <div>
            {/* first column */}
        <SelectUsers users={data} session={session}/>

        </div>
    
        <div>
            {/* second column */}
            <SelectRole />
        </div>
    
        <div className='md:pt-8'>
            {/* third column */}
            <button
                type="button"
                className=" w-full items-center text-center py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Submit
            </button>
        </div>

            {/* all users  */}
        <div>


        </div>
        
    </div>   
   </>


    )
   
}

export default RoleAssignment


