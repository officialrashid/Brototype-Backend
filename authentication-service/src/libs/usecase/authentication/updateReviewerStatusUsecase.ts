
export const updateReviewerStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (reviewerId: string,action:string) => {

        if (!reviewerId || !action) {
            return { status: false, message: "reviewer not found" }
        }
        const response = await authenticationRepository.updateReviewerStatus(reviewerId,action)
        console.log(response, 'response n usecase');
        if (response && response.length != 0) {
            return { response }
        } else {
            return { status: false, message: "reviewer not found " }
        }

    };

    return {
        executeFunction
    };
};
