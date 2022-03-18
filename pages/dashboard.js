import React from 'react'
import SideBarHeader from '../components/SideBarHeader'


function dashboard() {



    return (
      <div className='absolute inset-0'>
        <div className="absolute inset-0 h-screen bg-gray-50">
          <body className="absolute inset-0 h-screen overflow-hidden">
             <div className="absolute inset-0 max-h-screen flex">
                <SideBarHeader />
             </div>
          </body>
        </div>
      </div>
    )
    }
      
export default dashboard