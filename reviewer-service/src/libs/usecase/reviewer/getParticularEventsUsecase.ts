
export const getParticularEvents_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (reviewerId:string) => {
        try {
            const response = await reviewerRepository.getParticularEvents(reviewerId);
            if (response.status==true) {
                return {response }
            }else{
                return { status:false,message:"Not get particular events"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
