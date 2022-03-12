

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"


export default async (req, res) => {
    if (req.method === 'POST') { 

console.log("🚀 ~ file: editProject.js ~ line 10 ~ req.body", req.body)
           
            const session = await getSession({ req })
            
            if (session) {
                let editTicket = null
                const { db } = await connectToDatabase('myFirstDatabase');

    
                editTicket = await db.collection("projects").updateOne({My_ID:req.body.My_ID},
                {
                    $set: {
                        Title: req.body.Title,
                        Description: req.body.Description,
                        Members: req.body.Members

                    }
                }
            )
                    
           
                        

                
                if (editTicket != null){
                    console.log("🚀 ~ file: newTicket.js ~ line 33 ~ editTicket", editTicket)
                    return res.status(200).json(editTicket)   
                } else {
                    return res.data({error: "error updating"})   
                }
            }
           
        }
}







