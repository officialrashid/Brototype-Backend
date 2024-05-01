
export const updateAdvisorStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (advisorId: string,action:string) => {

        if (!advisorId || !action) {
            return { status: false, message: "advisor not found" }
        }
        const response = await authenticationRepository.updateAdvisorStatus(advisorId,action)
        if (response && response.length != 0) {
            return { response }
        } else {
            return { status: false, message: "advisor not found your hub" }
        }

    };

    return {
        executeFunction
    };
};
