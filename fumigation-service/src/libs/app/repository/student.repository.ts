
import schema from "../dataBase/schema"
import { fumigationProducer } from "../../../events/fumigationProducer";
import eventEmitter from '../../../events/eventEmitter';
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
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
  enqueryStudentsEmailExist: async (email: string, phone: string) => {
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
        return { status: false, message: "batch not found" }
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
      const batches = await schema.Batches.find({ _id: batchId });
      const allFumigationStudents: any = [];

      // Loop through batches and fumigation students
      batches.forEach((batch: { fumigationStudents: any[]; }) => {
        batch.fumigationStudents.forEach(student => {
          allFumigationStudents.push({
            studentId: student.studentId,
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
    startTime: string,
    endTime: string,
    mark: number,
    fumigationType: string
  ) => {
    console.log("update mark section il keriii ttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",batchId);
    
    try {
      // Find the batch with the given batchId and studentId
      const batch:any = await schema.Batches.findOne({ _id: batchId});
console.log(batch,"batchhhhh geteeeeeeeee");

      if (!batch) {
        console.log("! batch il keriii ttaaaaaaaa");
        
        return { status: false, message: "Batch not found" }
      }

      // Find the student's fumigationStudents record
      const fumigationStudent:any = batch.fumigationStudents.find(
        (student: { studentId: { toString: () => string; }; }) => student?.studentId?.toString() === studentId
      );

      if (!fumigationStudent) {
        return { status: false, message: "students not found in the batch" }
      }
console.log(fumigationStudent,"fumihgation studentseeeee");

      // Find the appropriate array within the student object based on fumigationType
      let targetArray;
      if (fumigationType === "mock") {
        targetArray = fumigationStudent.mock;
      } else if (fumigationType === "final") {
        console.log("keriyannuuuuuuuuuuu taaaaaaaaaa");
        
        targetArray = fumigationStudent.final;
      } else {
        console.log("erorr ilannn kerunnathhhhh");
        
        return { status: false, message: "only accept mock and final" }
      }
      // Find the index of the existing object if it exists
      const existingObjectIndex = targetArray.findIndex(
        (item: { examType: string; }) => item.examType === type
      );

      if (existingObjectIndex !== -1) {
        // If the object already exists, update its properties
        targetArray[existingObjectIndex].mark = mark;
        targetArray[existingObjectIndex].invigilatorId = invigilatorId;
        targetArray[existingObjectIndex].startTime = startTime;
        targetArray[existingObjectIndex].endTime = endTime;
      } else {
        // If the object doesn't exist, create a new one
        targetArray.push({ examType: type, mark: mark, invigilatorId: invigilatorId, startTime: startTime, endTime: endTime });
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

  getStudentsMark: async (studentId: string, batchId: string, fumigationType: string) => {
    try {
      const batch = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });

      if (!batch) {
        return { status: false, message: " betc not found" }
      }
      const fumigationStudent = batch.fumigationStudents.find(
        (student) => student?.studentId?.toString() === studentId
      );

      if (!fumigationStudent) {
        return { status: false, message: "students not found in the batch" }
      }
      if (fumigationType === 'mock') {

        return fumigationStudent.mock
      } else {
        return fumigationStudent.final
      }
    } catch (err) {
      return { status: false, message: "Error in the get Students Mark" }
    }

  },
  removeBatchwiseStudents: async (studentId: string, batchId: string) => {
    try {
      const studentDetails = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });
      console.log(studentDetails?.fumigationStudents,"studentDetailsss");
      
      if (!studentDetails) {
        return { status: false, message: "Batch or student not found" };
      }

      // Assuming fumigationStudents is an array, find the student in the array
      const foundStudentIndex = studentDetails.fumigationStudents.findIndex((student) =>{
        console.log(student.studentId?.toString(),'----',studentId);
        
return student.studentId == studentId
      } );
console.log(foundStudentIndex,"llllllllllll990***");

      if (foundStudentIndex === -1) {
        console.log("errore il keriiii");
        
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
  editStudentMark: async (studentId: string, batchId: string, fumigationType: string) => {
    try {
      const batch = await schema.Batches.findOne({
        _id: batchId,
        "fumigationStudents.studentId": studentId,
      });

      if (!batch) {
        return { status: false, message: " batch not found" }
      }
      const fumigationStudent = batch.fumigationStudents.find(
        (student) => student?.studentId?.toString() === studentId
      );

      if (!fumigationStudent) {
        return { status: false, message: "students not found in the batch" }
      }
      if (fumigationType === 'mock') {

        return fumigationStudent.mock
      } else {
        return fumigationStudent.final
      }
    } catch (err) {
      return { status: false, message: "Error in the edit student Mark" }
    }
  },
  passedStudentsDetails: async (studentId: any, batchId: any) => {
    try {
      // Find the batch with the given batchId
      const batch = await schema.Batches.findOne({ _id: batchId });


      // Check if the batch exists
      if (!batch) {
        return { status: false, message: 'Batch not found' };
      }
      const batchName = batch?.batchName
      // Find the student with the given studentId in the fumigationStudents array
      const student = batch.fumigationStudents.find((std) => String(std.studentId) === studentId);
      console.log(student, "nvhvghngvhnvghghn");

      // Check if the student exists
      if (!student) {
        return { status: false, message: 'Student not found in the batch' };
      }

      // Extract the desired details
      const { name, email, phone, qualification, prefferredLocation } = student;

      // Return the details
      return {
        status: true,
        details: { batchName, name, email, phone, qualification, prefferredLocation },
      };
    } catch (error) {
      console.error('Error retrieving student details:', error);
      return { status: false, message: 'Error retrieving student details' };
    }
  },
  getPassedStudentsDetails: async (batchId: string, fumigationType: string) => {
    try {
      const markRecord = await schema.markRecords.findOne({ batchId: batchId });

      if (!markRecord) {
        return { status: false, message: "Batch not found" };
      }

      let passedStudentsDetails: string | any[];

      if (fumigationType === 'mock') {
        passedStudentsDetails = markRecord.mock[0].passed;
      } else if (fumigationType === 'final') {
        passedStudentsDetails = markRecord.final[0].passed;
      } else {
        return { status: false, message: "Invalid fumigationType" };
      }

      let studentDetails: any[] = [];

      if (passedStudentsDetails.length > 0) {
        // Use Promise.all to wait for all promises to resolve
        await Promise.all(passedStudentsDetails.map(async (studentId: string) => {
          const batch = await schema.Batches.findOne({
            'fumigationStudents.studentId': studentId
          });

          if (batch) {
            console.log(batch,"batch cominggggggggg");
            
            const studentInfo = batch.fumigationStudents.find((std) => std.studentId?.toString() === studentId);

            if (studentInfo) {
              console.log(studentInfo,"studenyInfo comingggggg");
              
              // Assuming 'name' and 'email' are properties of the student object
              studentDetails.push({
                studentId: studentId,
                name: studentInfo.name,
                email: studentInfo.email,
                phone: studentInfo.phone,
                batch: batch.batchName,
                batchId: batchId
              });
            }
          }
        }));
      }

      return { status: true, passedStudentsDetails: studentDetails };
    } catch (error) {
      return { status: false, message: error };
    }
  },
    sendAllDataToAuth : async (data: Array<object>): Promise<any> => {
    console.log(data, 'fghghsgsh');
      try {
        // Send data to authentication service
        const response = await fumigationProducer(data, 'authentication', 'addStudents');
        return {status:true,message:"confirm passed students updated successfully"}
      } catch (error) {
        // Remove the listener in case of an error
         return {status:false,message:"Error in the send all data to auth"}
      }
    
  },
  getAllFumigationStudents: async (hubLocation: string, currentPage: number) => {
    try {
        if (!hubLocation) {
            return { status: false, message: "Fumigation students not found for your hub" };
        }
        const pageSize = 3; // Number of students per page
        const skip = (currentPage - 1) * pageSize;

        const incompleteBatches = await schema.Batches.find({ IsCompleted: false });

        const students: {
            studentId: any | undefined;
            name: string | undefined;
            email: string | undefined;
            phone: number | undefined;
            qualification: string | undefined;
            prefferredLocation: string;
            batchName: string | undefined;
            status: string;
        }[] = [];

        // Loop through incomplete batches and filter students by preferred location
        incompleteBatches.forEach(batch => {
            batch.fumigationStudents.forEach(student => {
                if (student.prefferredLocation === hubLocation) {
                    students.push({
                        studentId: student?.studentId,
                        name: student.name,
                        email: student.email,
                        phone: student.phone,
                        qualification: student.qualification,
                        prefferredLocation: student.prefferredLocation,
                        batchName: batch.batchName,
                        status: student.isStatus
                    });
                }
            });
        });

        // Sort students in descending order based on studentId or any relevant field
        students.sort((a, b) => b.studentId - a.studentId);

        // Paginate the sorted students array
        const paginatedStudents = students.slice(skip, skip + pageSize);

        return { status: true, students: paginatedStudents };
    } catch (error) {
        console.error("Error occurred while fetching all fumigation students:", error);
        return { status: false, message: "An error occurred while getting all fumigation students" };
    }
},


updateStudentStatus: async (studentId: string, batch: string, action: string) => {
  try {
    if (!studentId || !batch || !action) {
      return { status: false, message: "Fumigation students not updated, some issue occurred. Please try again later." };
    }

    // Find the batch
    const findBatch = await schema.Batches.findOne({ batchName: batch });
    if (!findBatch) {
      return { status: false, message: "Student batch not found." };
    }

    // Find the student in the batch
    const student = findBatch.fumigationStudents.find(std => String(std.studentId) === studentId);
    if (!student) {
      return { status: false, message: "Student not found." };
    }

    // Update the student's status
    student.isStatus = action;
    await findBatch.save();

    return { status: true, message: "Student status updated successfully." };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error in updating the fumigation student status." };
  }
},
getPerPageStudents: async (hubLocation: string, perPage: number) => {
  try {
      if (!hubLocation) {
          return { status: false, message: "Fumigation students not found for your hub" };
      }
console.log(perPage,"dfdbfdfdfdperp pageeeee");

      const incompleteBatches = await schema.Batches.find({ IsCompleted: false });

      const students: {
          studentId: any | undefined;
          name: string | undefined;
          email: string | undefined;
          phone: number | undefined;
          qualification: string | undefined;
          prefferredLocation: string;
          batchName: string | undefined;
          status: string;
      }[] = [];

      // Loop through incomplete batches and filter students by preferred location
      incompleteBatches.forEach(batch => {
          batch.fumigationStudents.forEach(student => {
              if (student.prefferredLocation === hubLocation) {
                  students.push({
                      studentId: student?.studentId,
                      name: student.name,
                      email: student.email,
                      phone: student.phone,
                      qualification: student.qualification,
                      prefferredLocation: student.prefferredLocation,
                      batchName: batch.batchName,
                      status: student.isStatus
                  });
              }
          });
      });

      // Limit the number of students based on the perPage parameter
      const limitedStudents = students.slice(0, (perPage));
       console.log(limitedStudents,"ndfdfdfdfdhfdfdfdvghfvdfdvfvgdvfghdfvdvfvdfvdf");
       
      return { status: true, students: limitedStudents };
  } catch (error) {
      console.error("Error occurred while fetching all fumigation students:", error);
      return { status: false, message: "An error occurred while getting all fumigation students" };
  }
},
getBatchId : async (batch:string) =>{
   try {
       if(!batch){
        return {status:false,message:"student not added"}
       }
       const response:any = await schema.Batches.find({batchName:batch})
       if(response){
        console.log(response[0]._id,"batchId respone cominggg");
        
        const batchId:any = response[0]._id.toString()
        return {status:true,batchId}
       }else{
        return {status:false,message:"batch not found"}
       }
   } catch (error) {
     return {status:false,message:"Error in the get batch"}
   }
},
getPendingStudents : async (uniqueId:string) =>{
   try {
     if(!uniqueId){
      return {status:false,message:"pending students not get successfully"}
     }
     const response = await schema.Enqueries.find({}).sort({_id: -1});
     if(response.length > 0){
      const pendingStudentCount = response.length
      return {status:true,pendingStudentCount}
     }else{
       return {status:false,message:"No Pending Students Available"}
     }
   } catch (error) {
     return {status:false,message:"Error getting from get pending students"}
   }
}


}
