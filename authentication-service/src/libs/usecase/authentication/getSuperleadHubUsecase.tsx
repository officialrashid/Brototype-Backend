
export const getSuperleadHub_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (uniqueId: string) => {

        if (!uniqueId) {
            return { status: false, message: "uniqueId not found" }
        }
        const response = await authenticationRepository.getSuperleadHubLocation(uniqueId)
        if (response && response.length != 0) {
            return { status: true, response }
        } else {
            return { status: false, message: "superlead not found your hub" }
        }

    };

    return {
        executeFunction
    };
};
