// import { Invigilators } from "../../entities/students";
import { sendEmail } from "../../../nodemailer/nodemailer";
// Define the interface for InvigilatorsData


export const superleadLogin_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: Authentication Repository not found");
  }

  const executeFunction = async (uniqueId: string) => {
        
    if(!uniqueId){
        return {status:false,message:"uniqueId not found"}
    }
    const response = await authenticationRepository.superleadLogin(uniqueId)
    console.log(response,'response n usecase');
    
    if(!response){
      return {status:false,message:"superlead not found this uniqueId"}
    }else {
      return {response}
    }
  };

  return {
    executeFunction
  };
};
