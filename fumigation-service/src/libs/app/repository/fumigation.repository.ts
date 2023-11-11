import { Batch } from "mongodb";
import schema from "../dataBase/schema"
import jwt from 'jsonwebtoken'
import config from "../../../config/config";
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../micro-service-project-8947b-firebase-adminsdk-eynvq-0bc088d933.json'
import fumigation from "../../controllers/fumigation";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});


export default {

  Enqueries: async (data: any) => {
    try {
      // create Enquerie Students function
      console.log(data, "data coming to the stundent repositoryyyyyyy");

      const EnqueriesData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        qualification: data.qualification,
        prefferredLocation: data.prefferredLocation
      }
      const response = await schema.Enqueries.create(EnqueriesData) //create the Enquerie Studnets
      return response;
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");

    }

  },
  getAllPendingStudents: async () => {
    try {
      //get All join pending students //
      const response = await schema.Enqueries.find({})
      return response
    } catch (err) {
      console.log(err, "error in the getAllPendingStundent function");

    }

  },
  // End get all pending Studenst function

  createBatch: async (data: any) => {
    try {
      //create a Batch function
      const batchesData = {
        batchName: data.batchName,
        hubLocation: data.hubLocation,
      }
      const response = await schema.Batches.create(batchesData)
      if (response) {
        const markRecord = {
          batchId: response._id,

          mock: [{
            passed: [],
            failed: []
          }],
          final: [{
            passed: [],
            failed: []
          }]

        }
        const markCollectionUpdate = await schema.markRecords.create(markRecord)
      }

      return response;
    } catch (err) {
      console.log(err, "error in the create batch function");

    }

  },
  addStudents: async (studentId: String, batchId: String) => {
    try {
      // Find the batch with the given batchId
      const batch = await schema.Batches.findById(batchId);
    
      if (!batch) {
        return {status:false, message: "batch not found"}
      }
    
      // Check if the student is not already in the batch
      const isStudentAlreadyAdded = batch.fumigationStudents.some(
        (fumigationStudent) => fumigationStudent.studentId === studentId
      );
    
      if (isStudentAlreadyAdded) {
        return { status: false, message: "Student is already in the batch" };
      }
    
      const studentDetails = await schema.Enqueries.findById(studentId);
    
      if (!studentDetails) {
        throw new Error("Student details not found");
      }
    
      const newFumigationStudents: any = {
        studentId: studentId,
        name: studentDetails.name,
        email: studentDetails.email,
        phone: studentDetails.phone,
        qualification: studentDetails.qualification,
        prefferredLocation: studentDetails.prefferredLocation
      };
    
      batch.fumigationStudents.push(newFumigationStudents);
      await batch.save();
      await schema.Enqueries.deleteOne({ _id: studentId });
      return { status: true, message: "Student batch-wise added successfully" };
    } catch (err) {
      console.error(err, "error in the add students in specific batches function");
    }
    


  },

  // End the add Students function.
  getBatchwiseStudents: async (batchId: string) => {
    try {
      const batches = await schema.Batches.find();
      const allFumigationStudents:any= [];
  
      // Loop through batches and fumigation students
      batches.forEach((batch: { fumigationStudents: any[]; }) => {
        batch.fumigationStudents.forEach(student => {
          allFumigationStudents.push({
            studentId : student.studentId,
            name: student.name,
            email: student.email,
            phone: student.phone,
            qualification: student.qualification
            // Add other details as needed
          });
        });
      });
  
      return allFumigationStudents;
    } catch (error) {
      console.error("Error retrieving fumigation students:", error);
      throw error;
    }
  },


  updateStudentMark: async (
    studentId: string,
    batchId: string,
    invigilatorId: string,
    type: string,
    mark: number,
    fumigationType: string
  ) => {

    try {
      // Find the batch with the given batchId and studentId
      const batch = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });

      if (!batch) {
        return { status: false, message: "Batch not found" }
      }

      // Find the student's fumigationStudents record
      const fumigationStudent = batch.fumigationStudents.find(
        (student) => student?.studentId?.toString() === studentId
      );

      if (!fumigationStudent) {
        return { status: false, message: "students not found in the batch" }
      }

      // Find the appropriate array within the student object based on fumigationType
      let targetArray;
      if (fumigationType === "mock") {
        targetArray = fumigationStudent.mock;
      } else if (fumigationType === "final") {
        targetArray = fumigationStudent.final;
      } else {
        return { status: false, message: "only accept mock and final" }
      }
      // Find the index of the existing object if it exists
      const existingObjectIndex = targetArray.findIndex(
        (item) => item.examType === type
      );

      if (existingObjectIndex !== -1) {
        // If the object already exists, update its properties
        targetArray[existingObjectIndex].mark = mark;
        targetArray[existingObjectIndex].invigilatorId = invigilatorId;
      } else {
        // If the object doesn't exist, create a new one
        targetArray.push({ examType: type, mark: mark, invigilatorId: invigilatorId });
      }
      // Save the updated batch
      await batch.save();
      return targetArray;
    } catch (err) {
      console.log(err, "error in the update student mark repository function");

    }


  },

  invigilatorLogin: async (uniqueId: string) => {
    console.log(uniqueId);
    const verifyInvigilator = await schema.Invigilators.findOne({uniqueId : uniqueId }); // Use findOne to get a single document

    if (verifyInvigilator) {
      console.log(verifyInvigilator);

      // Access _id on the found document
      const user = {
        _id: verifyInvigilator._id.toString(),
        name: verifyInvigilator.name?.toString(),
        email: verifyInvigilator.email?.toString()
      };

      const accessToken = await jwt.sign(user, config.secretKey, { expiresIn: '1d' });
      console.log(accessToken, "access token vannu makkalee");
      if (accessToken) {
        const uid = user._id.toString(); // Replace with the user's unique ID
        const customToken = await admin.auth().createCustomToken(uid);
        if (customToken) {
          console.log(customToken, "custom token vannindakdaa");
          return { verifyInvigilator,accessToken, customToken }
        }
      }
    }
  },
  createUniqueId: async () => {
    try {
      const response = await schema.Invigilators.find().sort({ _id: -1 }).limit(1).exec()
      return response;
    } catch (err) {
      console.log(err);
    }

  },
  invigilatorEmailExist: async (email: string, phone: string) => {
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
  updateStudentsPassedOrFailed: async (studentId: string, batchId: string, status: boolean, fumigationType: string) => {

    try {
      // Find the batch record that matches the batchId
      const batch = await schema.markRecords.findOne({ batchId: batchId });

      if (!batch) {
        return ({ status: false, message: 'Batch not found' });
      }

      // Check if fumigationType is 'mock' or 'final'
      if (fumigationType === 'mock') {
        // Check if status is true
        if (status === true) {
          // Find the object with 'mock' fumigationType
          const fumigationObject = (batch as any).mock;
          console.log(fumigationObject, "llll00000=--");

          if (!fumigationObject) {
            throw new Error('Fumigation type not found');
          }
          // Check if the studentId is in the failed array
          if (fumigationObject[0]?.failed?.includes(studentId)) {
            // Remove the studentId from the failed array
            const index = fumigationObject[0]?.failed?.indexOf(studentId);
            fumigationObject[0]?.failed.splice(index, 1);
          }

          // Check if the studentId is not already in the passed array
          if (!fumigationObject[0]?.passed?.includes(studentId)) {
            // Add the studentId to the passed array
            fumigationObject[0]?.passed?.push(studentId);

            // Save the updated batch record

          } else {
            return ({ status: false, message: 'Student has already passed' });
          }
        } else {


          const fumigationObject = (batch as any).mock;


          if (!fumigationObject) {
            throw new Error('Fumigation type not found');
          }

          // Check if the studentId is in the failed array
          if (fumigationObject[0]?.passed?.includes(studentId)) {
            // Remove the studentId from the failed array
            const index = fumigationObject[0]?.passed?.indexOf(studentId);
            fumigationObject[0]?.passed.splice(index, 1);
          }

          // Check if the studentId is not already in the passed array
          if (!fumigationObject[0]?.failed?.includes(studentId)) {
            // Add the studentId to the passed array
            fumigationObject[0]?.failed?.push(studentId);

          } else {
            return ({ status: false, message: 'Student has already failed' });
          }
        }
      } else {
        if (status === true) {
          // Find the object with 'mock' fumigationType
          const fumigationObject = (batch as any).final;
          if (!fumigationObject) {
            throw new Error('Fumigation type not found');
          }
          // Check if the studentId is in the failed array
          if (fumigationObject[0]?.failed?.includes(studentId)) {
            // Remove the studentId from the failed array
            const index = fumigationObject[0]?.failed?.indexOf(studentId);
            fumigationObject[0]?.failed.splice(index, 1);
          }

          // Check if the studentId is not already in the passed array
          if (!fumigationObject[0]?.passed?.includes(studentId)) {
            // Add the studentId to the passed array
            fumigationObject[0]?.passed?.push(studentId);

            // Save the updated batch record

          } else {
            return ({ status: false, message: 'Student has already passed' });
          }
        } else {


          const fumigationObject = (batch as any).final;
          if (!fumigationObject) {
            throw new Error('Fumigation type not found');
          }
          // Check if the studentId is in the failed array
          if (fumigationObject[0]?.passed?.includes(studentId)) {
            // Remove the studentId from the failed array
            const index = fumigationObject[0]?.passed?.indexOf(studentId);
            fumigationObject[0]?.passed.splice(index, 1);
          }

          // Check if the studentId is not already in the passed array
          if (!fumigationObject[0]?.failed?.includes(studentId)) {
            // Add the studentId to the passed array
            fumigationObject[0]?.failed?.push(studentId);

          } else {
            return ({ status: false, message: 'Student has already failed' });
          }
        }
      }
      await batch.save();

      return ({ status: true, message: 'Update successfully' })
    } catch (error) {
      throw error;
    }

  },
  getAllBatches : async ()=>{
     const response = await schema.Batches.find({},'batchName')
     const modifiedResponse = await response.map(({_id,batchName})=>({_id,batchName}))
     return modifiedResponse
     
  },
  getStudentsMark : async (studentId:string,batchId:string,fumigationType:string) =>{
    const batch = await schema.Batches.findOne({
      _id: batchId,
      "fumigationStudents.studentId": studentId,
    });

    if(!batch){
      return{status:false,message: " betc not found"}
    }
    const fumigationStudent = batch.fumigationStudents.find(
      (student) => student?.studentId?.toString() === studentId
    );

    if (!fumigationStudent) {
      return { status: false, message: "students not found in the batch" }
    }
   if(fumigationType==='mock'){
    console.log(fumigationStudent.mock,"sngdfdjhbfjg");
    
       return fumigationStudent.mock
   }else{
    console.log(fumigationStudent.mock,"sngdfdjhbfjg");
    
    return fumigationStudent.final
   }
  },
  removeBatchwiseStudents: async (studentId: string, batchId: string) => {
    try {
      const studentDetails = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });
  
      if (!studentDetails) {
        return { status: false, message: "Batch or student not found" };
      }
  
      // Assuming fumigationStudents is an array, find the student in the array
      const foundStudentIndex = studentDetails.fumigationStudents.findIndex(
        (student) => student.studentId === studentId
      );
  
      if (foundStudentIndex === -1) {
        return { status: false, message: "Student not found in the batch" };
      }
  
      // Access properties on the found student
      const data: any = {
        name: studentDetails.fumigationStudents[foundStudentIndex].name,
        email: studentDetails.fumigationStudents[foundStudentIndex].email,
        phone: studentDetails.fumigationStudents[foundStudentIndex].phone,
        qualification: studentDetails.fumigationStudents[foundStudentIndex].qualification,
        prefferredLocation: studentDetails.fumigationStudents[foundStudentIndex].prefferredLocation,
      };
  
      // Create a new document in the Batches collection with the student details
      const studentBackToPending = await schema.Enqueries.create(data);
  
      // Remove the student from the fumigationStudents array in the original batch
      studentDetails.fumigationStudents.splice(foundStudentIndex, 1);
      await studentDetails.save();
  
      return { status: true, message: "Student removed from the batch and moved back to pending" };
    } catch (error) {
      console.error(error, "error in the remove Batchwise students");
      return { status: false, message: "An error occurred while removing the student" };
    }
  },
  removeBatch : async (batchId:string)=>{
     
    try{
         const response = await schema.Batches.deleteOne({_id:batchId})
         return {status:true,message:"Batch remove successfully"}
    } catch(error){
      console.log(error,"error in the remove batch repository function");
      
    }
  },
  editBatch : async (batchId:string)=>{
    try{
      const response = await schema.Batches.find({_id:batchId})
       console.log(response,"response edite batch");
       if(response.length>0){
        return {status:true,response}
       }else{
        return {status:false,message:"batch not found"}
       }
      
    } catch(error){
      console.log(error,"error in the edit batch repository function");
      
    }
  },
  editBatchSubmit: async (batchId:string,batchName:string)=>{
      try{
          const response = await schema.Batches.updateOne({_id:batchId},{$set:{batchName:batchName}})
          return response;
      }catch(error){
        console.log(error,"error in the editBatchSubmit repository function");
        
      }
  },
  batchNameExist: async (batchName:string)=>{
    try{
       const response= await schema.Batches.find({batchName:batchName})
       console.log(response);
       
       return response
    }catch(error){
      console.log(error,"error in the batchName Exist check function");
      
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
  editInvigilator : async (invigilatorId:string)=>{
     try{
        const response = await schema.Invigilators.find({_id:invigilatorId})
        return response
     } catch(error){
      console.log(error,"error in the editInvigilator repository function");
      
     }
  },
  updateInvigilatorData: async (invigilatorId:string, name:string, email:string, phone:string, batch:string) => {
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
  console.log(response,"sdfhsfjgsjh78789");
  
     return response;
    } catch (error) {
      console.error(error, 'Error updating invigilator data');
      return { status: false, message: 'An error occurred while updating invigilator data' };
    }
  },
  removeInvigilator : async (invigilatorId:string)=>{
    try{
       const response = await schema.Invigilators.deleteOne({_id:invigilatorId})
       return response
    } catch(error){
      console.log(error,"error in teh remove invigilator Repository function");
      
    }
  }
  
  
}
