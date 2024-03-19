export const getBestReviewers_Usecase = (dependencies: any) => {

    const {
        repository: { reviewerRepository },
    } = dependencies;

    if (!reviewerRepository) {
        return console.log("Error: reviewer Repository not found");
    }

    const executeFunction = async () => {
        try {
            console.log("get best reviewrs found section starteddddd");
            
            const response = await reviewerRepository.getBestReviewers();
             console.log(response,"response in get best reviewwrsss");
             
            if (response && response.response.length > 0) {
                console.log(response, "response in use case");
                const bestReviewersDetails = await Promise.all(response.response.map(async (data: any) => {
                    const reviewerDetails = await reviewerRepository.getBestReviewersDetails(data?._id);
                    return { ...data, ...reviewerDetails.reviewerDetails };
                }));
    
                if (bestReviewersDetails && bestReviewersDetails.length > 0) {
                    console.log(bestReviewersDetails, "best reviewers details");
                    return { status: true, response: bestReviewersDetails };
                }else{
                    return {status:false,message:"Best five reviewers profile not found"}
                }

            } else {
                return { status: false, message: "Best five reviewers not found" };
            }
        } catch (err) {
            return { status: false, message: "Some issue in getting the profile" };
        }
    }

    return {
        executeFunction,
    };
};
