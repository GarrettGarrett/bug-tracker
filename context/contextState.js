import { createContext, useContext } from 'react';
import { useState } from 'react'
const AppContext = createContext();

export function AppWrapper({ children }) {


  const [tab, setTab] = useState(1)
  const [searchBarSelectedProject, setSearchBarSelectedProject] = useState(null)
  const [showProject, setShowProject] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)

  
  
  let sharedState = {
        tab,
        setTab,
        searchBarSelectedProject,
        setSearchBarSelectedProject,
        showProject,
        setShowProject,
        showTicket,
        setShowTicket,
        showEditProject,
        setShowEditProject,
    }
  

  return (
    <AppContext.Provider 
      value={sharedState} 
      setTab={setTab} 
      setSearchBarSelectedProject={setSearchBarSelectedProject}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}