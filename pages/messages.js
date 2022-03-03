import React from 'react'
import { useAppContext } from '../context/contextState'
import  SideBarHeader  from '../components/SideBarHeader'

// I should only be able to send messages to people I share projects with
// Retrieve a list of all projects i am apart of
// Retrieve a list of users who are in my projects.

// collection of projects
// projects have a collection of tickets
// tickets are bugs/feature requests inside of that project

function messages() {

    let context = useAppContext()
    
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

export default messages