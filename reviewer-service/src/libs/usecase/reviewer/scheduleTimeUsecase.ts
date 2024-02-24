import { Schedule } from "../../entities/schedule";
import { sendEmail } from "../../../nodemailer/nodemailer";
// Define the interface for InvigilatorsData
interface ScheduleData {
  reviewerId: string;
  id: String;
  startTime: String;
  endTime: String;
  day: String;
  label: String;
  date:string
}

export const scheduleTime_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository }
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: ScheduleData) => {

    
    try {
      if (!data) {
        return { status: false, message: "evet data not found" }
      }
      const response = await reviewerRepository.scheduleEventExist(data.reviewerId, data.startTime, data.endTime, data.day,data.date)

      console.log(response,"statstuusss");
      
      if (response.status==false) {
  
         
        return { status: false, message:"Event already scheduled for the specified time and date." }
      }
      const schedule = new Schedule(data);
     
      const res = await reviewerRepository.scheduleEvents(schedule)
      console.log(res,"resssssssssssssss");
      
      if (res) {
        return { status: true, message: "Event Schedule Successfully" }
      }
    } catch (err) {
      return { status: false, message: err }
    }

  };

  return {
    executeFunction
  };
};
