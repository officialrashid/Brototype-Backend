// Define the interface for InvigilatorsData
import { addressDetails } from "../../entities/addressDetails"
interface StudentData {
    data: {
        houseName: string;
        village: string;
        taluk: string;
        district: string;
        state: string;
        pincode: string;
    };
    studentId: string;
}

export const addressDetails_Usecase = (dependencies: any) => {
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
                    houseName,
                    village,
                    taluk,
                    district,
                    state,
                    pincode,
                },
                studentId,
            } = data;
            console.log(houseName, "daat coming to the usecaseee");
            if (!data) {
                return { status: false, message: "You Address details not get" }
            }

            const address = new addressDetails(houseName, village, taluk, district, state, pincode);

            const response = await studentsRepository.updateAddressDetails(address, studentId);
            if (response) {
                return { status: true, message: "Address Details Update Successfully", response }; // return success status to controller
            } else {
                return { status: false, message: "Address Details Update not done" }; 
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




