import { Schedule } from "../../entities/schedule";
import { sendEmail } from "../../../nodemailer/nodemailer";

export const deleteScheduleEvents_Usecase = (dependencies: any) => {
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
      const response = await reviewerRepository.deleteScheduleEvents(data)
      if(response){
        return {response}
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
