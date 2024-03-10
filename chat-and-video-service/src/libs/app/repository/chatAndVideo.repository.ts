import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

export default {

  createChat : async (chatData:any) => {
    try {
        if (!chatData || !chatData.initiatorId || !chatData.recipientId) {
            return { status: false, message: "Invalid chat data" };
        }
        
        // Create a new chat instance
        const newChat = new schema.Chat({
            participants: [{
                initiatorId: chatData.initiatorId,
                recipientId: chatData.recipientId
            }]
        });

        // Save the new chat to the database
        const response = await newChat.save();

        return { status: true, message: "Chat created successfully", data: response };
    } catch (error) {
        return { status: false, message: "Error creating chat", error: error };
    }
},
checkHaveAlreadyChatCreated: async (initiatorId:string, recipientId:string) => {
  try {
      if (!initiatorId || !recipientId) {
          return { status: false, message: "Some issue in Chat Create" };
      }
      const response = await schema.Chat.exists({
          participants: {
              $elemMatch: {
                  initiatorId: initiatorId,
                  recipientId: recipientId
              }
          }
      });
      return { status: response, message: response ? "Chat already exists" : "Chat does not exist" };
  } catch (error) {
      return { status: false, message: "Error checking chat existence: " + error };
  }
}

  
 
}