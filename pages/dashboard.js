import React from 'react'
import SideBarHeader from '../components/SideBarHeader'


function dashboard() {



    return (
      <div className='absolute inset-0'>
        <html className="absolute inset-0 h-screen bg-gray-50">
          <body className="absolute inset-0 h-screen overflow-hidden">
             <div className="absolute inset-0 max-h-screen flex">
        {/* <html className="h-screen bg-gray-50">
          <body className="h-full overflow-hidden">
             <div className="h-full flex"> */}
                <SideBarHeader />

             </div>
          </body>
        </html>
      </div>
    )
    }
      
export default dashboard