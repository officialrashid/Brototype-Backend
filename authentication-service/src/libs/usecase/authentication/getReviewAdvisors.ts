import { sendEmail } from "../../../nodemailer/nodemailer";
import { Students } from "../../entities/students";

export const getReviewAdvisors_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    return null;
  }

  const executeFunction = async () => {
    try {
     const response = await authenticationRepository.getReviewAdvisors()
  
  
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };

  return {
    executeFunction,
  };
};
