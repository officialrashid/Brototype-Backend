
export const getCourseCompletion_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId: string,batchId:string) => {
        try {
            const response = await studentsRepository.getCourseCompletion(studentId,batchId);
            if (response) {
                return {response }
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Course completion graph"}
        }

    }
    return {
        executeFunction,
    };
};
