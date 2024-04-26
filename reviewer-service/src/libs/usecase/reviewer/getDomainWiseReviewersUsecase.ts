
export const getDomainWiseReviewers_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (domain: string) => {
        try {
            console.log(domain,"lllllllllllll(*******&&&&& Usecaseeeeee");
            const response = await reviewerRepository.getDomainWiseReviewers(domain);
            if (response.status===true) {
                return { response }
            } else {
                return { status:false,message:"not match domain"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
