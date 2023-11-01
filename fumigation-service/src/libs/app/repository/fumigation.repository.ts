import { Batch } from "mongodb";
import schema from "../dataBase/schema"


export default {

    Enqueries : async (data:any)=>{
       console.log(data,"data coming to the stundent repositoryyyyyyy");
       
        const EnqueriesData = {
            name : data.name,
            email: data.email,
            phone: data.phone,
            qualification : data.qualification,
            prefferedLocation : data.preferredLocation
        }
        const response = await schema.Enqueries.create(EnqueriesData)
        return response;
    },
    getAllPendingStudents : async () =>{
        const response = await schema.Enqueries.find({})
        return response
    },
    createBatch : async (data:any) =>{
        const batchesData ={
            batchName : data.batchName,
            hubLocation: data.hubLocation,
        }
        const response = await schema.Batches.create(batchesData)
        return response;
    },
    addStudents : async (studentId:String,batchId:String) =>{
       const batch = await schema.Batches.findById(batchId)
       if(!batch){
        throw new Error("Batch not found")
       }
        let newFumigationStudents: any ={
        userId: studentId,
        pattern: "",
        array: "",
        oops: "",
        communication: ""
       }
       batch.fumigationStudents.push(newFumigationStudents)
       await batch.save()
       return {status:true,message:"student batch wise added successfully"}
    },
    getBatchwiseStudents : async (batchId:String)=>{

        const batch = await schema.Batches.findById(batchId)
        if(!batch){
            throw new Error("Batch not found")
        }
        const studentId = await batch.fumigationStudents
        const studentDetails = await schema.Enqueries.find({ _id: { $in: studentId } });
        return studentDetails
    },
     addStudentsMark : async (type: string, startTime: string, endTime: string): Promise<void> => {
       
      }
}