

import { connectToDatabase } from '../../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req
    let idSplit = id.split("-")
    let projectID = idSplit[0]
    let ticketID = idSplit[1]
    if (req.method === 'GET') { 
        const session = await getSession({ req })
        if (session) {
            const { db } = await connectToDatabase('myFirstDatabase');
            const project = await db.collection("projects").findOne({"My_ID": parseInt(projectID)})
            // only return comments for requested ticket
            let targetTicketImages = {}
            for (const [key, value] of Object.entries(project)) {
                if (key.includes(`Images-${ticketID}`)) {
                    targetTicketImages = value 
                }
            }
            if (project){
                return res.status(200).json(targetTicketImages)   
            }
        }
    }
}







