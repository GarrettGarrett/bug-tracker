

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"


export default async (req, res) => {
    if (req.method === 'POST') { 

console.log("🚀 ~ file: editTicket.js ~ line 10 ~ req.body", req.body)
           
            
            const session = await getSession({ req })
            
            if (session) {
              
                const { db } = await connectToDatabase('myFirstDatabase');
                
                

                ticketsByUser = await db.collection("projects").find( { "Tickets.Members": { email: req.body._id } } )
                
            
                console.log("🚀 ~ file: getTicketsByUser.js ~ line 23 ~ ticketsByUser", ticketsByUser)
                    
             
                    

                
                if (ticketsByUser){
                    console.log("🚀 ~ file: newTicket.js ~ line 33 ~ ticketsByUser", ticketsByUser)
                    return res.status(200).json(ticketsByUser)   
                } else {
                    return res.data({error: "error updating"})   
                }
            }
           
        }
}







