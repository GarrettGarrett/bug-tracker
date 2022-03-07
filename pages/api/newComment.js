

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
const ObjectId = require('mongodb').ObjectId

// updateOne({_id: md_id}).   

export default async (req, res) => {
    if (req.method === 'POST') { 
        console.log("🚀 ~ file: newComment.js ~ line 12 ~ req.body", req.body)
            var id = req.body.projectID
            var md_id = new ObjectId(id);
            console.log("🚀 ~ file: newComment.js ~ line 13 ~ md_id", md_id)
    

            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase('myFirstDatabase');
                const newComment = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                    {$push: {
                        [`Comments-${req.body.TicketID}`]: req.body.Comment
                    }},{upsert: true})

                       
                    
                
                if (newComment){
                    console.log("🚀 ~ file: newComment.js ~ line 33 ~ newProject", newComment)
                    return res.status(200).json(newComment)   
                }
            }
           
        }
}







