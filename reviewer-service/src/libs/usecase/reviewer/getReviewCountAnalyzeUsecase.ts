
export const getReviewCountAnalyze_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async () => {
        try {
            const response = await reviewerRepository.getReviewCountAnalyze();
            if (!response) {
                return { status:false,message:"Reviewer review count not found"}
            
            }else{
                return { status: true, response }
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
