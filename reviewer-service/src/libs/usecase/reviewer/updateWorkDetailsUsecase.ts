// Define the interface for InvigilatorsData
import { workDetails } from "../../entities/workDetails"
interface ReviewerData {
    data: {
        experience: string;
        skills: string;
        CurrentWorkingCompanyName: string;
        PrefferedDomainsForReview: string;
    };
    reviewerId: string;
}

export const reviewerWrokDetails_Usecase = (dependencies: any) => {
    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (data: ReviewerData) => {

        try {
            const {
                data: {
                    experience,
                    skills,
                    CurrentWorkingCompanyName,
                    PrefferedDomainsForReview,
                },
                reviewerId,
            } = data;
            if (!data) {
                return { status: false, message: "You Address details not get" }
            }

            const work = new workDetails( experience, skills, CurrentWorkingCompanyName, PrefferedDomainsForReview);

            const response = await reviewerRepository.updateWorkDetails(work, reviewerId);
            if (response) {
                return { status: true, message: "Work Details Update Successfully" }; // return success status to controller
            }else{
                return { status:false,message:"Work Details update not done"}
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




