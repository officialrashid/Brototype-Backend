
export const updateStudentStatus_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (studentId: string,action:string) => {

        if (!studentId || !action) {
            return { status: false, message: "student not found" }
        }
        const response = await authenticationRepository.updateStudentStatus(studentId,action)
        console.log(response, 'response n usecase');
        if (response && response.length != 0) {
            return { response }
        } else {
            return { status: false, message: "student not found ypur hub" }
        }

    };

    return {
        executeFunction
    };
};
