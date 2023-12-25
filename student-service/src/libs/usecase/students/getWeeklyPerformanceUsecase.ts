
export const getWeeklyPerformance_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId:string,batchId:string,week:string) => {
        try {
            const response = await studentsRepository.getWeeklyPerformance(studentId,batchId,week);
            if (response) {
                return { status: true, response }
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
