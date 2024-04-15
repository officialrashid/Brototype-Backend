
export const getAllChatReviewers_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async () => {
        try {
            const response = await reviewerRepository.getAllChatReviewers();
            if (response.length>0) {
                return { status: true, response }
            }else{
                return { status:false,message:"Your not update profile"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
