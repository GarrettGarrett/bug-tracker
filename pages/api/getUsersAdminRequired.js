import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {

    if (req.method === 'GET') {

        // verify that user requesting all user data is an admin:
        const session = await getSession({ req })

        if (session) {

        const { db } = await connectToDatabase('myFirstDatabase');
        // get list of admin users
        const admin_array = await db.collection('admin').find().toArray()
        const admin_array_just_names = []
        admin_array.forEach(item => {
            admin_array_just_names.push(item.name)
        })
            
            if (admin_array_just_names.includes(session.user.name)){
                // if admin, then get all users 
                const all_users_array = await db.collection('users').find().toArray()
                
                if (all_users_array) {
                    return res.status(200).json(all_users_array)        
                }  
        
               
            } else {
                console.log("You must have admin privileges to view the protected content on this page.")
                res.send({
                    error: "You must have admin privileges to view the protected content on this page.",
                    
                  })
            }
       
        } else {
            console.log("You must have admin privileges to view the protected content on this page.")
            res.send({
                error: "You must be signed in to view the protected content on this page.",
              })
        }
        
    }
}