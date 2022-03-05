import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"



export default async (req, res) => {
    if (req.method === 'POST') {    
            console.log("🚀 ~ file: newProject.js ~ line 16 ~ req.body", req.body)

            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase('myFirstDatabase');
                
                const newProject = await db
                .collection("projects")
                .insertOne(req.body)
                
                if (newProject){
                    return res.status(200).json(newProject)   
                }
            }
           
        }
}







