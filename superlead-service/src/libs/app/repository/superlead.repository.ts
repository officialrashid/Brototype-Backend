import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import superlead from "../../controllers/superlead";
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

export default {

  checkEmailAndPhone : async (email:string,phone:string,superleadId:string) =>{
    try {
      const response = await schema.Superlead.find({ $or: [{ email }, { phone }] });
      if(response.length > 0){
        console.log(response[0].superleadId,"dncnd cmnd");
        if(response[0].superleadId === superleadId){
          return {status:true,message:"same Superlead email and password"}
        }else{
          return {status:false,message:"not same superlead email and password "}
        }
      }else{
        return response;
      }
    
     
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }
  },
  updateProfile: async (data: { superleadId: string; imageUrl: string; firstName: string; lastName: string; email:string; phone: string; gender:string; dateOfBirth:string; hubLocation:string,qualification:string;pastYourWorkedCompany:string;yearOfExpereience:string }) => {
    try {
      // Check if the profile with the given superleadId exists
      const existingProfile = await schema.Superlead.findOne({
        superleadId: data.superleadId
      });

      if (existingProfile) {
        // If profile exists, update specific fields with the new data
        const updatedProfile = await schema.Superlead.findOneAndUpdate(
          { superleadId: data.superleadId },
          {
            $set: {
              imageUrl: data.imageUrl || existingProfile.imageUrl,
              firstName: data.firstName || existingProfile.firstName,
              lastName: data.lastName || existingProfile.lastName,
              email: data.email || existingProfile.email,
              phone: data.phone || existingProfile.phone,
              gender: data.gender || existingProfile.gender,
              dateOfBirth: data.dateOfBirth || existingProfile.dateOfBirth,
              hubLocation: data.hubLocation || existingProfile.hubLocation,
              qualification: data.qualification || existingProfile.qualification,
              pastYourWorkedCompany: data.pastYourWorkedCompany || existingProfile.pastYourWorkedCompany,
              yearOfExpereience: data.yearOfExpereience || existingProfile.yearOfExpereience,
              // Add other fields here if needed
            }
          },
          { new: true }
        );

        return updatedProfile;
      } else {
        // If profile doesn't exist, create a new profile
        const newProfile = await schema.Superlead.create(data);
        return newProfile;
      }
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }
  },
  
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
  patchSuperleadProfile: async (data: any) => {
    try {
      if (!data || !data.superleadId) {
        return { status: false, message: "Superlead not found" };
      }
  
      const existingProfile = await schema.Superlead.findOne({
        superleadId: data.superleadId
      });
  
      if (!existingProfile) {
        return { status: false, message: "Superlead not found" };
      }
  
      const updatedProfile = await schema.Superlead.updateOne(
        { superleadId: data.superleadId },
        {
          $set: {
            imageUrl: data.imageUrl || existingProfile.imageUrl,
            firstName: data.firstName || existingProfile.firstName,
            lastName: data.lastName || existingProfile.lastName,
            email: data.email || existingProfile.email,
            phone: data.phone || existingProfile.phone,
            gender: data.gender || existingProfile.gender,
            dateOfBirth: data.dateOfBirth || existingProfile.dateOfBirth,
            hubLocation: data.hubLocation || existingProfile.hubLocation,
            qualification: data.qualification || existingProfile.qualification,
            pastYourWorkedCompany: data.pastYourWorkedCompany || existingProfile.pastYourWorkedCompany,
            yearOfExperience: data.yearOfExperience || existingProfile.yearOfExpereience,
            // Add other fields here if needed
          }
        }
      );
  
      if (!updatedProfile) {
        return { status: false, message: "Profile not updated" };
      }else{
        return { status: true, message: "Superlead profile updated successfully" };
      }

    } catch (error) {
      return { status: false, message: "Error in updating the Superlead profile" };
    }
  }
  
  
 
}