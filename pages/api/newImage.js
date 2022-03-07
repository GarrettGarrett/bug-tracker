

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

 

export default async (req, res) => {
    if (req.method === 'POST') { 
        console.log("🚀 ~ file: newComment.js ~ line 12 ~ req.body", req.body)
            var id = req.body.projectID

    

            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase('myFirstDatabase');
                const newImage = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                    {$push: {
                        [`Images-${req.body.TicketID}`]: {image:req.body.Image, title: req.body.ImageTitle}
                    }},{upsert: true})

                       
                    
                
                if (newImage){
                    console.log("🚀 ~ file: newImage.js ~ line 33 ~ newProject", newImage)
                    return res.status(200).json(newImage)   
                }
            }
           
        }
}







