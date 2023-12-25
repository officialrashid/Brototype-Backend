import { response } from "express";
import schema from "../dataBase/schema"


export default {

  profileUpdate: async (profileData: any) => {
    try {
      const response = await schema.Manifest.create(profileData) //create the Enquerie Studnets
      return response;
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }

  },
  getProfile: async (studentId: string) => {
    console.log(studentId, "studentId coming or not check log");
    try {
      const response = await schema.Manifest.find({ studentId: studentId })
      return response
    } catch (err) {

    }
  },
  studentEmailAndPhoneExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Manifest.find({ $or: [{ email }, { phone }] });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }

  },
  checkPrentsPhoneExist: async (fathersContact: number, mothersContact: number) => {
    try {
      const response = await schema.Manifest.find({ $or: [{ fathersContact }, { mothersContact }] })
      return response;
    } catch (err) {
      return { status: false, message: "Error in the parents phone number check" }
    }
  },
  updatePersonalDetails: async (data: any, studentId: string) => {
    try {
      const resposne = await schema.Manifest.findOneAndUpdate({ studentId: studentId }, data, { new: true })
      return resposne
    } catch (err) {
      return { status: false, message: "Error in the update personal details" }
    }

  },
  updateAddressDetails: async (data: any, studentId: string) => {
    try {
      const response = await schema.Manifest.findOneAndUpdate({ studentId: studentId }, data, { new: true })
      return response
    } catch (err) {
      return { status: false, message: "Error in the update address details" }
    }
  },
  updateEducationDetails: async (data: any, studentId: string) => {
    try {
      console.log(data, "education dTA");

      const response = await schema.Manifest.findOneAndUpdate({ studentId: studentId }, data, { new: true })
      return response;
    } catch (err) {
      return { status: false, message: "Error in the update education details" }
    }
  },
  getAllStudentDetails: async (batchId: string) => {
    console.log(batchId, "Batch ID coming in");

    try {
      // Use the Mongoose model to find the desired data
      const response = await schema.WeekRecord.find({ batchId: batchId });

      console.log(response, "Retrieved all student details");
      return response;
    } catch (err) {
      console.error('Error in getting all student details:', err);
      return { status: false, message: "Error in the getting all student details" };
    }
  },
   getWeeklyPerformance : async (studentId: string, batchId: string, weekRange: string) => {
    try {
      const batch = await schema.WeekRecord.findOne({ batchId });
  
      if (!batch) {
        return { status: false, message: "Batch not found" };
      }
  
      const student = batch.students.find((s) => s.studentId === studentId);
  
      if (!student) {
        return { status: false, message: "Student not found in the batch" };
      }
  
      const [start, end] = weekRange.split('-').map(Number);
  
      if (isNaN(start) || isNaN(end) || start < 1 || end > 7 || start > end) {
        return { status: false, message: "Invalid week range" };
      }
  
      const weeklyPerformances = [];
  
      for (let i = start; i <= end; i++) {
        const weekName = `week${i}`;
        const weeklyPerformance = student.weeks.find((w) => w.week === weekName);
  
        if (weeklyPerformance) {
          weeklyPerformances.push(weeklyPerformance);
        }
      }
  
      if (weeklyPerformances.length === 0) {
        return { status: false, message: "No weekly performance found in the specified range" };
      }
  
      return { status: true, data: weeklyPerformances };
    } catch (err) {
      return { status: false, message: "Error in getting weekly performance" };
    }
  },
  getCourseCompletion : async (studentId:string,batchId:string)=>{
     console.log(studentId,batchId,"backend course completion data cominggggggg");
     
    try {
      const batch = await schema.WeekRecord.findOne({ batchId });
      if (!batch) {
        return { status: false, message: "Batch not found" };
      }
  
      const student = batch.students.find((s) => s.studentId === studentId);
      if (!student) {
        return { status: false, message: "Student not found in this batch" };
      }
  
      // Count the number of completed weeks
      const completedWeeks = student.weeks.reduce((count, week) => (week.status ? count + 1 : count), 0);
       console.log(student.totalWeeks,"||||||||||||||||||||||||");
       
      // Calculate the percentage of completed weeks
      const percentageCompleted = (completedWeeks / student.totalWeeks) * 100;
      
      return { status: true, completedWeeks, percentageCompleted };
    } catch (err) {
      return { status: false, message: "Error in Course Completion" };
    }

  },
  getAllPerformance : async (studentId:string,batchId:string) =>{
     try {
       const batch = await schema.WeekRecord.findOne({batchId})
       if(!batch){
        return {status:false,message:"batch not found"}
       }
       const student = batch.students.find((s:any) => s.studentId === studentId);

       if(!student){
        return {status:false,message:"student not found in this batch "}
       }
       const allPerformance = student.weeks
       if(allPerformance.length>0){
        return {status:true,allPerformance}
       }else{
        return {status:false, message:"student not week  found"}
       }
      
     } catch (err) {
       return {status:false,message:"Error in the student get all performance"}
     }
  },
  getExtendDetails : async (studentId:string,batchId:string)=>{
       
    try {
     
        const batch = await schema.WeekRecord.findOne({batchId})
        if(!batch){
          return {status:false,message:"batch not found"}
        }
        const student = await batch.students.find((s)=>s.studentId===studentId)
        if(!response){
          return {status:false,message : "student not found in this batch"}
        }
        const currentWeeks = student?.weeks
        return currentWeeks;
        
    } catch (err) {
      return {status:false,message:"some issues in get extend details"}
    }
  }
}
