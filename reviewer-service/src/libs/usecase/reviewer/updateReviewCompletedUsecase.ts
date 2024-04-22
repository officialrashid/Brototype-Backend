
export const updateReviewCompleted_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (reviewerId:string,eventId:string,bookedEventId:string,status:boolean) => {
        try {
            const response = await reviewerRepository.updateReviewCompleted(reviewerId,eventId,bookedEventId,status);
            if (response.status==true) {
                return {response }
            }else{
                return { status:false,message:"Not Successfully update review completed status"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
