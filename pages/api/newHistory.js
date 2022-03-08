

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
import moment from 'moment'
import { isImportEqualsDeclaration } from 'typescript'

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

  function findOldValueFromNewValue(oldObject, keyName, newValue){
    let oldValue = null
    for (const [key, value] of Object.entries(oldObject)) {
        if (key == keyName) {
            oldValue = value
        }
    return oldValue
}
}

export default async (req, res) => {
    if (req.method === 'POST') { 
        console.log("🚀 ~ file: newHistory.js ~ line 18 ~ req.body", req.body)
            const session = await getSession({ req })
            if (session) {
                const fieldsToUpdate = []

                for (const [key, value] of Object.entries(req.body.editedValues)) {
                    if (value != null 
                    && key != 'selectedProjectID' 
                    && key!= 'MembersRemoved'
                    && key!= 'MembersAdded') { //skipping project change for now
                        fieldsToUpdate.push({key: key, value: value})
                    }
                  }
    


                const { db } = await connectToDatabase('myFirstDatabase');
                console.log("🚀 ~ file: newHistory.js ~ line 20 ~ fieldsToUpdate", fieldsToUpdate)
                // for each field that has been updated (not null),
                // find the old value in the old object
                // track the updated field name, old value, new value
                if (fieldsToUpdate?.length > 0){
                    for (const field of fieldsToUpdate) {    
                        const newHistory = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                            {$push: {
                                [`History-${req.body.existingTicket.TicketID}`]: 
                                {
                                    PropertyChanged: field.key, 
                                    OldValue: req.body.existingTicket[field.key],
                                    NewValue: field.value,
                                    Owner: session?.user?.name ? session?.user?.name :
                                    getNameFromEmail(session.user.email),
                                    CreatedAt: moment()
                                }
                            }},{upsert: true})
    
    
                    
                    if (newHistory){
                        console.log("🚀 ~ file: newHistory.js ~ line 33 ~ newProject", newHistory)
                        return res.status(200).json(newHistory)   
                    }
                }
                }
                
           
        }
    }
}








