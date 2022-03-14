import { connectToDatabase } from '../../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
import { isTemplateTail } from 'typescript'


export default async (req, res) => {
    if (req.method === 'GET') { 
        const {
            query: { id },
            method
        } = req

            // for guest accounts, use email
            // for all other accounts, use _id
            const userID = id
            
            const session = await getSession({ req })
            
            if (session) {
              
                const { db } = await connectToDatabase('myFirstDatabase');
                                

                const allProjects = await db.collection('projects').find().toArray()
                
                
                if (allProjects){
                
                    let TicketsForUser = []
                    let ProjectsForUser = []
                    allProjects.forEach(project => {
                        project?.Tickets.forEach(ticket => {
                            ticket.Members.forEach( member => {
                                if (id.includes("@")) { //guest account, use email to lookup
                                    if (member.email == userID) {
                                        TicketsForUser.push(ticket)
                                        ProjectsForUser.push(project)
                                    }
                                } 
                                if (!userID.includes("@")){
                                    if (member._id == userID) {
                                        TicketsForUser.push(ticket)
                                        ProjectsForUser.push(project)
                                    }
                                }
                                
                            })
                            
                        })
                    })

                    return res.status(200).json({TicketsForUser:TicketsForUser, ProjectsForUser:ProjectsForUser})   
                } 
                
                
            }
            else {
                return res.json({ error: "Invalid Credentials"})  
            }
           
        }
}







