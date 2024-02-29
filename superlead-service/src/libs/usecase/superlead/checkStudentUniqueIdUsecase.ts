
import { sendEmail } from "../../../nodemailer/nodemailer";
import { Students } from "../../entities/superlead";

export const checkStudentUniqueId_Usecase = (dependencies: any) => {
  const {
    repository: { superleadRepository }
  } = dependencies;

  if (!superleadRepository) {
    console.error("Error: Authentication Repository not found");
    // You might want to throw an error here or handle it according to your needs
    return null;
  }

  const executeFunction = async (data: any) => {
    console.log(data, "data coming to the useCase");
    if (!data) {
      return { status: false, message: "student data not received, try again later" };
    }
    try {
     
  
      return { status: true, message: "Confirm student email verification success" };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };
  
  return {
    executeFunction,
  };
  
  

};


