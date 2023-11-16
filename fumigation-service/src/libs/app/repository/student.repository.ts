import { Batch } from "mongodb";
import schema from "../dataBase/schema"
import jwt from 'jsonwebtoken'
import config from "../../../config/config";
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../nextjs-project-6651b-firebase-adminsdk-rc9m6-9e6adae01b.json'
import fumigation from "../../controllers/fumigation";




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
  enqueryStudentsEmailExist : async (email: string, phone: string) => {
    try {
      const response = await schema.Enqueries.find({ $or: [{ email }, { phone }] });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
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
        return { status: false, message: "Student is already in the batch" }; // return not success reponse
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
      const batches = await schema.Batches.find({_id:batchId});
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
    startTime:string,
    endTime:string,
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
        targetArray[existingObjectIndex].startTime = startTime;
        targetArray[existingObjectIndex].endTime = endTime;
      } else {
        // If the object doesn't exist, create a new one
        targetArray.push({ examType: type, mark: mark, invigilatorId: invigilatorId,startTime:startTime,endTime:endTime });
      }
      // Save the updated batch
      await batch.save();
      return targetArray;
    } catch (err) {
      console.log(err, "error in the update student mark repository function");

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
 
  getStudentsMark : async (studentId:string,batchId:string,fumigationType:string) =>{
    try{
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
    
         return fumigationStudent.mock
     }else{
      return fumigationStudent.final
     }
    } catch(err){
      return {status:false,message:"Error in the get Students Mark"}
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
  editStudentMark : async (studentId:string,batchId:string,fumigationType:string)=>{
    try {
      const batch = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });
  
      if(!batch){
        return{status:false,message: " batch not found"}
      }
      const fumigationStudent = batch.fumigationStudents.find(
        (student) => student?.studentId?.toString() === studentId
      );
  
      if (!fumigationStudent) {
        return { status: false, message: "students not found in the batch" }
      }
      if(fumigationType==='mock'){
    
        return fumigationStudent.mock
    }else{
     return fumigationStudent.final
    }
    } catch(err){
      return {status:false,message:"Error in the edit student Mark"}
    }
  }
}
