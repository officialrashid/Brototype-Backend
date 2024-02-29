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

  createUniqueId: async () => {
    try {
      const response = await schema.Students.find().sort({ _id: -1 }).limit(1).exec()
      return response;
    } catch (err) {
      console.log(err);
    }

  },
  studentEmailExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Students.find({ $or: [{ email }, { phone }] });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }

  },
  uniqueIdExist: async (uniqueId: String) => {
    try {
      const response = await schema.Students.find({ uniqueId: uniqueId })
      return response;
    } catch (err) {
      console.log(err, "error in the unueIdExist check function");
    }

  },
  createStudents: async (data: any, uniqueId: string) => {

    console.log(data, "++++++6666666");
    try {
      const studentData = {
        studentId: data.studentId,
        batchId : data.batchId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        batch: data.batch,
        uniqueId: uniqueId,
      };

      console.log(studentData, "The funcing Data");

      const response = await schema.Students.create(studentData);
      console.log(response, "Student created successfully");


      return { status: true, message: "Students created successfully" };
    } catch (err) {
      console.error(err, "Error in creating students");
      throw err;
    }
  },
  studentLogin : async (uniqueId: string) => {
    try {

      const student = await schema.Students.findOne({ uniqueId });
        
      if (student) {
        console.log(student);
  
        const students = {
          _id: student._id.toString(),
          name: student.name?.toString(),
          email: student.email?.toString()
        };
  
        const accessToken = await jwt.sign(students, config.secretKey, { expiresIn: '7d' });
        if (accessToken) {
          const uid = students._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { student, accessToken, customToken };
          }else{
            return {status:false,message:"student not found"}
          }
        }else{
          return {status:false,message:"your access denied some time wait"}
        }
      }else{
        return {status:false,message:"student not found"}
      }
    } catch (error) {
      return { error: 'Internal server error' };
    }
  },
  reviewerLogin :async (uniqueId:string) =>{
    try {

      const reviewer = await schema.Reviewers.findOne({ uniqueId });
        
      if (reviewer) {
        console.log(reviewer);
  
        const reviewers = {
          _id: reviewer._id.toString(),
          name: reviewer.name?.toString(),
          email: reviewer.email?.toString()
        };
  
        const accessToken = await jwt.sign(reviewers, config.secretKey, { expiresIn: '1d' });
        if (accessToken) {
          const uid = reviewers._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { reviewer, accessToken, customToken };
          }else{
            return {status:false,message:"reviewer not found"}
          }
        }else{
          return {status:false,message:"your access denied some time wait"}
        }
      }else{
        return {status:false,message:"reviewer not found"}
      }
    } catch (error) {
      return { error: 'Internal server error' };
    }
},
superleadLogin : async (uniqueId:string) =>{
  try {

    const superlead = await schema.Superleads.findOne({ uniqueId });
      
    if (superlead) {
      console.log(superlead);

      const superleads = {
        _id: superlead._id.toString(),
        name: superlead.name?.toString(),
        email: superlead.email?.toString()
      };

      const accessToken = await jwt.sign(superleads, config.secretKey, { expiresIn: '7d' });
      if (accessToken) {
        const uid = superleads._id.toString();
        const customToken = await admin.auth().createCustomToken(uid);
        if (customToken) {
          return { superlead, accessToken, customToken };
        }else{
          return {status:false,message:"superlead not found"}
        }
      }else{
        return {status:false,message:"your access denied some time wait"}
      }
    }else{
      return {status:false,message:"superlead not found"}
    }
  } catch (error) {
    return { error: 'Internal server error' };
  }
}
}