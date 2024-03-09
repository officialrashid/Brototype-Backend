
export const gePerPageStudentStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (uniqueId: string,currentPage:number) => {

        if (!uniqueId) {
            return { status: false, message: "uniqueId not found" }
        }
        const response = await authenticationRepository.getAllStudentsStatus(uniqueId,currentPage)
        console.log(response, 'response n usecase');
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
