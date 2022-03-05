import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import AllUsersAlpha from './AllUsersAlpha'
import AlphaUsersSearch from './AlphaUsersSearch'


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

   

export default function NewProject() {
    const { data, error, isValidating } = useSWR('/api/getUsers', fetcher)
    const [alphaUsers, setAlphaUsers] = useState(data ? createAlphaObject(data) : null)
    console.log("🚀 ~ file: NewProject.js ~ line 55 ~ NewProject ~ alphaUsers", alphaUsers)
    const [alphaUsersFiltered, setAlphaUsersFiltered] = useState(alphaUsers)
    console.log("🚀 ~ file: NewProject.js ~ line 55 ~ NewProject ~ alphaUsersFiltered", alphaUsersFiltered)
    const [searchBar, setSearchBar] = useState(null)


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
    if (!data) return (<><h1 className='text-black'>Loading</h1></>)
    if (data) return (
  
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">New Project</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Use this form to create a new project.
              </p>
            </div>
  
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 text-black">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            
  
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500">Brief description of the project.</p>
                </div>
              </div>
  
             
  
  
          <div className=" pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Project Members</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Select who will be apart of this project.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5 "></div>
            {
                alphaUsersFiltered !== null ?
                <>
                    <AlphaUsersSearch users={alphaUsers} filterUsers={filterUsers} searchBar={searchBar} setSearchBar={setSearchBar} removeFilter={removeFilter}/>
                    <AllUsersAlpha users={alphaUsersFiltered}/>
                </>
                 : null
            }
           
          </div>
          
        </div>

  
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
        </div>
        </div>
      </form>
    )
  }
  