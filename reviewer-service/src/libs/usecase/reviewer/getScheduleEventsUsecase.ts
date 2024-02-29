import { Schedule } from "../../entities/schedule";
import { sendEmail } from "../../../nodemailer/nodemailer";

export const getScheduleEvents_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (reviewerId:string) => {

    
    try {
      if (!reviewerId) {
        return { status: false, message: "evet data not found" }
      }
      const response = await reviewerRepository.getScheduleEvents(reviewerId)
      if(response.length > 0){
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
