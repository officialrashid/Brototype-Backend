
export const getAllReviewersStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async () => {
        const response = await authenticationRepository.getAllReviewers()
        if (response && response.length != 0) {
            return { status: true, response }
        } else {
            return { status: false, message: "student not found ypur hub" }
        }

    };

    return {
        executeFunction
    };
};
