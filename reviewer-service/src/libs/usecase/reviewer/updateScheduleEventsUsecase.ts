import { Schedule } from "../../entities/schedule";
import { sendEmail } from "../../../nodemailer/nodemailer";

export const updateScheduleEvents_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data:any) => {
    
    
    try {
      if (!data) {
        return { status: false, message: "evet data not found" }
      }
       console.log(data,"data cominggg update schedule eventssss");
      
      const res = await reviewerRepository.scheduleEventExist(data.reviewerId, data.startTime, data.endTime, data.day,data.date)

      console.log(res,"statstuusss");
      
      if (res.status==false) {
  
         
        return { status: false, message:"Event already scheduled for the specified time and date." }
      }
      const response = await reviewerRepository.updateScheduleEvents(data)
      if(response){
        return {status:true,response}
      }else{
        return {status:false,message:"scheduleEvents not found"}
      }
    } catch (err) {
      return { status: false, message: err }
    }

  };

  return {
    executeFunction
  };
};
