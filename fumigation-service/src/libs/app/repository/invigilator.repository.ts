import schema from "../dataBase/schema"
import jwt from 'jsonwebtoken'
import config from "../../../config/config";
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../nextjs-project-6651b-firebase-adminsdk-rc9m6-9e6adae01b.json'
import dotenv from "dotenv"
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

export default{

    createUniqueId: async () => {
        try {
          const response = await schema.Invigilators.find().sort({ _id: -1 }).limit(1).exec()
          return response;
        } catch (err) {
          console.log(err);
        }
    
      },
      invigilatorEmailExist: async (email: string, phone: Number) => {
        try {
          const response = await schema.Invigilators.find({ $or: [{ email }, { phone }] });
          console.log(response);
    
          return response;
        } catch (err) {
          console.log(err, "error in the invigilatorEmailExist check function");
        }
    
      },
      uniqueIdExist: async (uniqueId: String) => {
        try {
          const response = await schema.Invigilators.find({ uniqueId: uniqueId })
          return response;
        } catch (err) {
          console.log(err, "error in the unueIdExist check function");
        }
    
      },
      createInvigilator: async (data: any) => {
        try {
          const invigilatorData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            batch: data.batch,
            uniqueId: data.uniqueId
    
          }
          const response = await schema.Invigilators.create(invigilatorData) //create the Enquerie Studnets
          return response;
        } catch (err) {
          console.log(err, "error in the createInvigilator fumigationRepository");
    
        }
    
      },
      updateInvigilatorData: async (invigilatorId:string, name:string, email:string, phone:Number, batch:string) => {
        try {
          const response = await schema.Invigilators.updateOne(
            { _id: invigilatorId }, // Match invigilatorId
            {
              $set: {
                name: name,
                email: email,
                phone: phone,
                batch: batch
                // Add other fields you want to update
              }
            }
          );
         return response;
        } catch (error) {
          return { status: false, message: 'An error occurred while updating invigilator data' };
        }
      },
      editInvigilator : async (invigilatorId:string)=>{
        try{
           const response = await schema.Invigilators.find({_id:invigilatorId})
           return response
        } catch(error){
         console.log(error,"error in the editInvigilator repository function");
         
        }
     },
     getInvigilators : async ()=>{
        try{
    
          const response= await schema.Invigilators.find({})
           return response
        } catch(error){
          console.log(error,"error in the get Invigilators repository function");
          
        }
      },
     invigilatorLogin : async (uniqueId: string) => {
        try {
          console.log(uniqueId);
          const verifyInvigilator = await schema.Invigilators.findOne({ uniqueId });
      
          if (verifyInvigilator) {
            console.log(verifyInvigilator);
      
            const user = {
              _id: verifyInvigilator._id.toString(),
              name: verifyInvigilator.name?.toString(),
              email: verifyInvigilator.email?.toString()
            };
      
            const accessToken = await jwt.sign(user, config.secretKey, { expiresIn: '1d' });
            if (accessToken) {
              const uid = user._id.toString();
              const customToken = await admin.auth().createCustomToken(uid);
              if (customToken) {
                return { verifyInvigilator, accessToken, customToken };
              }
            }
          }
      
          // Handle case where invigilator is not found
          return { error: 'Invigilator not found' };
        } catch (error) {
          return { error: 'Internal server error' };
        }
      },
      removeInvigilator : async (invigilatorId:string)=>{
        try{
           const response = await schema.Invigilators.deleteOne({_id:invigilatorId})
           return response
        } catch(error){
          console.log(error,"error in teh remove invigilator Repository function");
          
        }
      },
      invigilatorGoogleLogin : async (email:string)=>{
        try{
            const response = await schema.Invigilators.find({email:email})
            return response
        } catch(err){
          return {status:false,err:"Internal Server Error"}
        }
      }
}