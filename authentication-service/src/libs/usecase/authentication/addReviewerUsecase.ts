
import { sendEmail } from "../../../nodemailer/nodemailer";
import { Reviewers } from "../../entities/reviewers";

export const addReviewer_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
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

        const lastResponse = await authenticationRepository.createReviewersUniqueId();
        let lastNumber = 0;
    
        if (lastResponse && lastResponse.length > 0) {
          const lastUniqueId = lastResponse[0].uniqueId;
    
          if (lastUniqueId) {
            const lastNumberStr = lastUniqueId.substr(-3);
            lastNumber = parseInt(lastNumberStr, 10);
          }
        }
        const newUniqueId = `RWE${String(lastNumber + 1).padStart(3, '0')}`;
        const emailPhoneCheckResult = await authenticationRepository.reviewerEmailExist(data.email, data.phone);
        if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {
          const uniqueIdExist = await authenticationRepository.reviewerUniqueIdExist(newUniqueId);
          if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
             const loginUrl = "http://localhost:5173/reviewerIn"
            sendEmail("Hello Reviewer", newUniqueId, loginUrl, data.email);
            const reviewer = new Reviewers({
              ...data,
              uniqueId: newUniqueId,
            });
            
            const createReviewerResponse = await authenticationRepository.createReviewers(data,newUniqueId);
          } else {
            return { status: false, message: "UniqueId already exists" };
          }
        } else {
          return { status: false, message: "Email or phone already exists" };
        }
      return { status: true, message: "Reviewer Created Successfully" };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };
  
  return {
    executeFunction,
  };
  
  

};


