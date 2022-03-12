import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import TicketOverView from './TicketOverview'


const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))


function Home({session}) {
    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)
   
return (
    <div>
        {
            data &&  <TicketOverView tickets={data.TicketsForUser}/>
        }
       
    </div>
)
   

}

export default Home