

export const checkStudentActive_Usecase = (dependencies: any) => {
    const { repository: { authenticationRepository } } = dependencies;

    if (!authenticationRepository) {
        throw new Error("Error: Authentication Repository not found");
    }

    const executeFunction = async (studentId:string) => {
        try {
            if (!studentId) {
                return { status: false, message: "student not found" };
            }
        const response = await authenticationRepository.checkStudentActive(studentId)
        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
