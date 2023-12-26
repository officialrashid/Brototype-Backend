import { callbackPromise } from "nodemailer/lib/shared";
import schema from "../dataBase/schema"


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
      createStudents: async (data: any,uniqueId:string) => {
     
        console.log(data, "++++++6666666"); 
        try {
            const studentData = {
              studentId: data.studentId,
              name: data.name,
              email: data.email,
              phone: data.phone,
              batch: data.batch,
              uniqueId: uniqueId,
            };
     
        console.log(studentData,"The funcing Data");
        
            const response = await schema.Students.create(studentData);
            console.log(response, "Student created successfully");
          
      
          return { status: true, message: "Students created successfully" };
        } catch (err) {
          console.error(err, "Error in creating students");
          throw err;
        }
      }
      
}