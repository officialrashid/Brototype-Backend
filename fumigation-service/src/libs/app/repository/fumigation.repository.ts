import { Batch } from "mongodb";
import schema from "../dataBase/schema"
import jwt from 'jsonwebtoken'
import config from "../../../config/config";
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json';
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
        prefferedLocation: data.preferredLocation
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
        throw new Error("Batch not found");
      }

      // Check if the student is not already in the batch
      const isStudentAlreadyAdded = batch.fumigationStudents.some(
        (fumigationStudent) => fumigationStudent.studentId === studentId
      );

      if (isStudentAlreadyAdded) {
        return { status: false, message: "Student is already in the batch" };
      }

      const newFumigationStudents: any = {
        studentId: studentId,
      };

      batch.fumigationStudents.push(newFumigationStudents);
      await batch.save();

      return { status: true, message: "Student batch-wise added successfully" };
    } catch (err) {
      console.log(err, "error in the add students in specific batches function");

    }


  },

  // End the add Students function.
  getBatchwiseStudents: async (batchId: string) => {
    try {
      const batch = await schema.Batches.findById(batchId);
      if (!batch) {
        throw new Error("Batch not found");
      }

      // Extract all student IDs from the fumigationStudents array
      const studentIds = batch.fumigationStudents.map((student) => student.studentId);

      // Use the student IDs to fetch student details from another collection (schema.Enqueries)
      const studentDetails = await schema.Enqueries.find({ _id: { $in: studentIds } });

      return studentDetails;
    } catch (error) {
      console.error("Error retrieving batch-wise students:", error);
      throw error; // Re-throw the error to handle it at a higher level if needed.
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

  invigilatorLogin: async (name: string, email: string) => {
    console.log(name, email);
    const verifyInvigilator = await schema.Enqueries.findOne({ email: email }); // Use findOne to get a single document

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
          return { accessToken, customToken }
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

  }
}
