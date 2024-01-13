
export const getProfile_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (reviewerId: string) => {
        try {
            const response = await reviewerRepository.getProfile(reviewerId);
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
