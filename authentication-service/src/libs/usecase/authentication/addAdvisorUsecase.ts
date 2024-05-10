
import { sendEmail } from "../../../nodemailer/nodemailer";
import { Advisors } from "../../entities/advisor";

export const addAdvisor_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    // You might want to throw an error here or handle it according to your needs
    return null;
  }

  const executeFunction = async (data: any) => {
    if (!data) {
      return { status: false, message: "student data not received, try again later" };
    }
    try {

        const lastResponse = await authenticationRepository.createAdvisorsUniqueId();
        let lastNumber = 0;
    
        if (lastResponse && lastResponse.length > 0) {
          const lastUniqueId = lastResponse[0].uniqueId;
    
          if (lastUniqueId) {
            const lastNumberStr = lastUniqueId.substr(-3);
            lastNumber = parseInt(lastNumberStr, 10);
          }
        }
        const newUniqueId = `BRC${String(lastNumber + 1).padStart(3, '0')}`;
        const emailPhoneCheckResult = await authenticationRepository.advisorEmailExist(data.email, data.phone);
        if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {
          const uniqueIdExist = await authenticationRepository.advisorUniqueIdExist(newUniqueId);
          if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
            const loginUrl = "http://localhost:5173/advisorIn"
            sendEmail("Hello Advisor", newUniqueId,loginUrl,data.email);
            const advisor = new Advisors({
              ...data,
              uniqueId: newUniqueId,
            });
            
            const createReviewerResponse = await authenticationRepository.createAdvisors(data,newUniqueId);
          } else {
            return { status: false, message: "UniqueId already exists" };
          }
        } else {
          return { status: false, message: "Email or phone already exists" };
        }
      return { status: true, message: "advisor Created Successfully" };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };
  
  return {
    executeFunction,
  };
  
  

};


