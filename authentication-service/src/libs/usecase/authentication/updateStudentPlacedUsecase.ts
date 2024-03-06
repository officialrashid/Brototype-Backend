
export const updateStudentPlaced_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (studentId: string,action:string,confirm:string,date:string) => {

        if (!studentId || !action || ! confirm || !date) {
            return { status: false, message: "student not found" }
        }
        const response = await authenticationRepository.updatePlacedStudentStatus(studentId,action,confirm,date)
        if (response && response.length != 0) {
            return { response }
        } else {
            return { status: false, message: "student not found your hub" }
        }

    };

    return {
        executeFunction
    };
};
