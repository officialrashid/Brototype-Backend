import { Batch } from "mongodb";
import schema from "../dataBase/schema"
import jwt from 'jsonwebtoken'
import config from "../../../config/config";
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json';
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

});

export default {

    Enqueries: async (data: any) => {  // create Enquerie Students function
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
    },
    getAllPendingStudents: async () => { //get All join pending students //
        const response = await schema.Enqueries.find({})
        return response
    },
    // End get all pending Studenst function

    createBatch: async (data: any) => { //create a Batch function
        const batchesData = {
            batchName: data.batchName,
            hubLocation: data.hubLocation,
        }
        const response = await schema.Batches.create(batchesData)
        return response;
    },
    addStudents: async (studentId: String, batchId: String) => { // add Students in specific Batches
        const batch = await schema.Batches.findById(batchId)
        if (!batch) {
            throw new Error("Batch not found")
        }
        let newFumigationStudents: any = {
            userId: studentId,
            Pattern: 0,
            Array: 0,
            Oops: 0,
            Communication: 0
        }
        batch.fumigationStudents.push(newFumigationStudents)
        await batch.save()
        return { status: true, message: "student batch wise added successfully" }
    },
    // End the add Students function.
    getBatchwiseStudents: async (batchId: String) => {  //Get All  Batch Wise Students

        const batch = await schema.Batches.findById(batchId)
        if (!batch) {
            throw new Error("Batch not found")
        }
        const studentId = await batch.fumigationStudents
        const studentDetails = await schema.Enqueries.find({ _id: { $in: studentId } });
        return studentDetails
    },
    updateStudentMark: async (studentId: string, batchId: string, type: string, mark: number) => { // update Student interview Marks//
        try {
            // Find the batch by its _id
            const batch = await schema.Batches.findById(batchId);

            if (!batch) {
                throw new Error("Batch not found");
            }

            // Find the student within the fumigationStudents array by userId
            const studentIndex = batch.fumigationStudents.findIndex((student) => student.userId === studentId);

            if (studentIndex === -1) {
                throw new Error("Student not found in the batch with the given userId");
            }
            // chech the case. case means type that way updated the correct mark
            switch (type) {
                case "Pattern":
                    batch.fumigationStudents[studentIndex].Pattern = mark;
                    break;
                case "Array":
                    batch.fumigationStudents[studentIndex].Array = mark;
                    break;
                case "Oops":
                    batch.fumigationStudents[studentIndex].Oops = mark;
                    break;
                case "Communication":
                    batch.fumigationStudents[studentIndex].Communication = mark;
                    break;
                default:
                    throw new Error("Invalid 'type' value");
            }
            // end conditions
            await batch.save(); //update the Marks
            return { message: "mark updated successfully" }

        } catch (error) {
            console.error("Error updating student's pattern:", error);
        }
        // not completed in this section ****
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
        const response = await schema.Invigilators.find().sort({ _id: -1 }).limit(1).exec()
        return response;
    },
    invigilatorEmailExist: async (email: string, phone: string) => {
        const response = await schema.Invigilators.find({ $or: [{ email }, { phone }] });
        console.log(response);
      
        return response;
      },
      
    uniqueIdExist : async (uniqueId:String)=>{
        const response = await schema.Invigilators.find({uniqueId:uniqueId})
        return response;
    },
    createInvigilator : async (data: any)=>{
        const invigilatorData ={
            name : data.name,
            email: data.email,
            phone :data.phone,
            batch : data.batch,
            uniqueId : data.uniqueId
            
        }
        const response = await schema.Invigilators.create(invigilatorData) //create the Enquerie Studnets
        return response;
    }
}