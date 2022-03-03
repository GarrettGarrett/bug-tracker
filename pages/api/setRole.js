import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"



export default async (req, res) => {
    console.log("🚀 ~ file: setRole.js ~ line 8 ~  req.body",  req.body)
    
    // receives role & id of user
    const session = await getSession({ req })
    const { db } = await connectToDatabase('myFirstDatabase');
        // get list of admin users
        const admin_array = await db.collection('admin').find().toArray()
        const admin_array_just_names = []
        admin_array.forEach(item => {
            admin_array_just_names.push(item.name)
        })
            
        if (admin_array_just_names.includes(session.user.name)){ //if admin
            let ObjectId = require('mongodb').ObjectId;      
            let o_id = new ObjectId(req.body._id);

            const upsertRole = await db
            .collection('users')
            .updateOne({_id:o_id}, //if role doesnt exist yet, create. if it does, update.
                {$set: {
                    role: req.body?.selectedRole.name, name: req.body?.name, email: req.body?.email, image: req.body?.image
                }},{upsert: true})

            if (upsertRole){
                return res.status(200).json(upsertRole)   
            }
        }
}