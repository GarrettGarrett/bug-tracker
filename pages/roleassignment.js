import React from 'react'
import { useAppContext } from '../context/contextState'
import  SideBarHeader  from '../components/SideBarHeader'
import useSWR from 'swr'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))


function roleassignment() {
    const { data, error } = useSWR('/api/getUsersAdminRequired', fetcher)

    
    return (
      <html className="h-screen bg-gray-50">
      <body className="h-full overflow-hidden">
        <div className="h-full flex">
            <SideBarHeader />
            

        </div>
      </body>
    </html>
    )
}

export default roleassignment