import { createContext, useContext } from 'react';
import { useState } from 'react'
const AppContext = createContext();

export function AppWrapper({ children }) {


  const [tab, setTab] = useState(1)
  
  let sharedState = {
        tab: tab,
        setTab: setTab
    }
  

  return (
    <AppContext.Provider value={sharedState} setTab={setTab}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}