import { sendEmail } from "../../../nodemailer/nodemailer";
import { Students } from "../../entities/students";

export const checkStudentUniqueId_Usecase = (dependencies: any) => {
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

    // Check if data is iterable
    const dataArray = Array.isArray(data) ? data : [data];

    if (!dataArray || dataArray.length === 0) {
      return { status: false, message: "student data not received, try again later" };
    }

    try {
      for (const studentData of dataArray) {
        console.log(studentData,"studentataaaa coming daaaaaaaaa");
        
        const lastResponse = await authenticationRepository.createUniqueId();
        let lastNumber = 0;

        if (lastResponse && lastResponse.length > 0) {
          const lastUniqueId = lastResponse[0].uniqueId;

          if (lastUniqueId) {
            const lastNumberStr = lastUniqueId.substr(-3);
            lastNumber = parseInt(lastNumberStr, 10);
          }
        }
        const newUniqueId = `${studentData.batch}STD${String(lastNumber + 1).padStart(3, '0')}`;
        console.log(newUniqueId, "::::::::", studentData.email);

        const emailPhoneCheckResult = await authenticationRepository.studentEmailExist(studentData.email, studentData.phone);
        console.log(emailPhoneCheckResult, "Email and phone check result");

        if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {
          const uniqueIdExist = await authenticationRepository.uniqueIdExist(newUniqueId);
          console.log(uniqueIdExist, "UniqueId check result");

          if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
            const loginUrl = "http://localhost:5173/studentIn"
            sendEmail("Hello Student", newUniqueId,loginUrl, studentData.email);

            const student = new Students({
              ...studentData,
              uniqueId: newUniqueId,
            });
            console.log(student, "vxbcvxcbvxcnvxbcnvxhnvbdhjgfjh");

            const createStudentResponse = await authenticationRepository.createStudents(studentData, newUniqueId);
          } else {
            return { status: false, message: "UniqueId already exists" };
          }
        } else {
          return { status: false, message: "Email or phone already exists" };
        }
      }

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
