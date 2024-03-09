
export const getPerPageReviewers_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }
    const executeFunction = async (currentPage:number) => {
        try {
            const response = await reviewerRepository.getPerPageReviewers(currentPage);
            console.log(response,"resppnse in get all revewers");
            
            if (response && response.response.length>0) {
                return { response }
            }else{
                return { status:false,message:"reviewers not found"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
