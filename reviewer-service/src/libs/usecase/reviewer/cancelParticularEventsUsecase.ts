
export const cancelParticularEvents_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (reviewerId:string,eventId:string,bookedEventId:string,advisorId:string,studentId:string,bookStatus:boolean) => {
        try {
            const response = await reviewerRepository.cancelParticularEvents(reviewerId,eventId,bookedEventId,advisorId,studentId,bookStatus);
            if (response.status==true) {
                return {response }
            }else{
                return { status:false,message:"Not Successfully updated particular events"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
