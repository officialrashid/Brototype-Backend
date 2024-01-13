// Define the interface for InvigilatorsData
import { educationDetails } from "../../entities/educationDetails"
interface StudentData {
    data: {
        highestQualification: string;
        yearOfPassing: string;
        passPercentage: string;
        schoolOrCollegeOrInstituteName: string;
    };
    studentId: string;
}

export const educationDetails_Usecase = (dependencies: any) => {
    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (data: StudentData) => {

        try {
            const {
                data: {
                    highestQualification,
                    yearOfPassing,
                    passPercentage,
                    schoolOrCollegeOrInstituteName,
                },
                studentId,
            } = data;
            console.log(highestQualification, "daat coming to the usecaseee");
            if (!data) {
                return { status: false, message: "You Address details not get" }
            }

            const education = new educationDetails(highestQualification, yearOfPassing, passPercentage, schoolOrCollegeOrInstituteName);

            const response = await studentsRepository.updateEducationDetails(education, studentId);
            if (response) {
                return { status: true, message: "Education Details Update Successfully", response }; // return success status to controller
            }else{
                return { status: false, message: "Education Details Update not done" }; 
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




