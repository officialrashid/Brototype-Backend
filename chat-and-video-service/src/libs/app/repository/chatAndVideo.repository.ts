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

 

  getProfile : async  (superleadId:string) =>{
      try {
        if(!superleadId){
          return {status:false,message:"Your Profile Not Found"}
        }
        const response = await schema.Superlead.find({superleadId:superleadId})
        return response;
      } catch (error) {
        return {status:false,message:"Error in the Superlead Profile Access"}
      }
  },
 
  
 
}