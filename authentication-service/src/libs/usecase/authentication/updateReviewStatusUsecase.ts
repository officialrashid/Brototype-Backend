
export const updateReviewStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (studentId: string,currentWeek:string,status:boolean) => {

        if (!studentId || !currentWeek) {
            return { status: false, message: "reviewer not found" }
        }
        const response = await authenticationRepository.updateReviewStatus(studentId,currentWeek,status)
        if (response.status===true) {
            return { response }
        } else {
            return { status: false, message: "review status update not successfully " }
        }

    };

    return {
        executeFunction
    };
};
