// get role

import { connectToDatabase } from '../../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req
    if (req.method === 'GET') { 
            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase('myFirstDatabase');
                const project = await db.collection("users").findOne({email: id})
                if (project){
                    return res.status(200).json({role: project.role})   
                }
            } return res.status(200).json({data: "No Session"})   
        }
}







