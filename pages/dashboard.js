import React from 'react'
import SideBarHeader from '../components/SideBarHeader'


function dashboard() {



    return (
      <>
        <html className="h-screen bg-gray-50">
          <body className="h-full overflow-hidden">
             <div className="h-full flex">
                <SideBarHeader />
             </div>
          </body>
        </html>
      </>
    )
    }
      
export default dashboard