

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"


export default async (req, res) => {
    if (req.method === 'POST') { 

console.log("🚀 ~ file: editTicket.js ~ line 10 ~ req.body", req.body)
            const fieldsToUpdate = []
            for (const [key, value] of Object.entries(req.body.editedValues)) {
                if (value != null 
                && key != 'selectedProjectID' 
                && key!= 'MembersRemoved'
                && key!= 'MembersAdded') { //skipping project change for now
                    fieldsToUpdate.push({key: key, value: value})
                }
              }
            
            const session = await getSession({ req })
            
            if (session) {
                let editTicket = null
                const { db } = await connectToDatabase('myFirstDatabase');
                
                if (fieldsToUpdate?.length > 0){
                    console.log("🚀 ~ file: editTicket.js ~ line 28 ~ fieldsToUpdate", fieldsToUpdate)
                    for (const field of fieldsToUpdate) {
                        editTicket = await db.collection("projects").updateOne({"Tickets.TicketID":req.body.TicketID},
                        {
                            $set: {
                                [`Tickets.$.${field.key}`]: field.value,
                                [`Tickets.$.Members`]: req.body.selectedUserObjects,

                            }
                        }
                    )
                    
                } 
            }              

                
                if (editTicket != null){
                    console.log("🚀 ~ file: newTicket.js ~ line 33 ~ editTicket", editTicket)
                    return res.status(200).json(editTicket)   
                } else {
                    return res.data({error: "error updating"})   
                }
            }
           
        }
}







