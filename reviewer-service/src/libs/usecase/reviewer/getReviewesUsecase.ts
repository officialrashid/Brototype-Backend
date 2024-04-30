
export const getReviewes_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (reviewerId: string) => {
        try {
            console.log(reviewerId,"review gtting starteddddd");
            
            const response = await reviewerRepository.getReviewes(reviewerId);
            if (response.status===true) {
                return { response }
            }else{
                return { response}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
