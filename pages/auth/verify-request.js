import React from 'react'

function verifyrequest() {
  return (
    <>

    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Check Your Email</h2>
       
      </div>
      

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                <h3 className='py-4 text-lg'>A sign in link has been sent to your email address.</h3>
                
            </div>
    </div>

          
         
    </div>
  </>
  )
}

export default verifyrequest