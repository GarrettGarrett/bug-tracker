import React from 'react'

function NewProjectSubmitButtons({buttonMessage, loading, visibleErrorString, handleSubmit, setShowNewTicket, showNewTicket, setShowEditProject,setShowProject, mutateProject, setMutateProject}) {
  return (
    <>
    <div className="flex justify-end pt-5">
{/*                 
                <button
                    onClick={() => {
                        if (setShowEditProject){
                            setShowEditProject(false)
                        }
                        if (setShowProject){
                            setShowProject(true)
                        }
                        if (showNewTicket) {
                            setShowNewTicket(false)
                            
                        }
                    }}
                    type="button"
                    className=" w-32 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button> */}

                <button
                    disabled={buttonMessage != "Submit"}
                    onClick={() => {handleSubmit()}}
                    type="submit"
                    className="w-32 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-Verdigris hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Verdigris"
                >
                    {
                        !loading ? 
                        buttonMessage
                        :
                        <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="purple" strokeWidth="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                </button>
                            
    </div>

    <div className="flex justify-end pr-1 pt-3">
                                    {
                                        visibleErrorString != null && <p className='text-red-700 text-lg'>{visibleErrorString}</p>
                                    }
                                </div>
    
    
    </>
  )
}

export default NewProjectSubmitButtons