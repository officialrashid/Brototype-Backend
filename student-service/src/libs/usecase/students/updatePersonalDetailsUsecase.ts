// Define the interface for InvigilatorsData
import { personalDetails } from "../../entities/personalDetails"
interface StudentData {
    data: {
      firstName: string;
      lastName: string;
      middleName: string;
      dateOfBirth: string;
      age: string;
      email: string;
      gender: string;
      phone: string;
      fathersName: string;
      fathersContact: string;
      mothersName: string;
      mothersContact: string;
    };
    studentId: string;
  }

export const personalDetails_Usecase = (dependencies: any) => {
    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (data: StudentData) => {
        const {
            data: {
              firstName,
              lastName,
              middleName,
              dateOfBirth,
              age,
              email,
              gender,
              phone,
              fathersName,
              fathersContact,
              mothersName,
              mothersContact,
            },
            studentId,
          } = data;
        console.log(email,"daat coming to the usecaseee");
         
        try {
            const emailPhoneCheckResult = await studentsRepository.studentEmailAndPhoneExist(email, phone);
            console.log(emailPhoneCheckResult, "Email and phone check result");

            if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {

                const parentsPhoneCheck = await studentsRepository.checkPrentsPhoneExist(fathersContact,mothersContact)

                if (!parentsPhoneCheck || (parentsPhoneCheck && parentsPhoneCheck.length === 0)) {

                    const manifest = new personalDetails(firstName,lastName,middleName,dateOfBirth,age,email,phone,gender,fathersName,mothersName,fathersContact,mothersContact);

                    const response = await studentsRepository.updatePersonalDetails(manifest,studentId);
                    if (response) {
                        return { status: true, message:"Persanal Details Update Successfully", response }; // return success status to controller
                      }else{
                        return { status: false, message:"Persanal Details update not done, something went wrong" }
                      }
                }
            }
        } catch (error) {
            // Handle the error here
            console.error("Error in createBatch_Usecase:", error);

            // You can choose to return a specific error message or status here
            return { status: false, message: "An error occurred while creating the batch" };
        }
    };
    return {
        executeFunction,
    };
};




