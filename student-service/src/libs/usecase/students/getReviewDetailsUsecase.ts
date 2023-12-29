
export const getReviewDetails_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId: string,batchId:string) => {
        try {
            const response = await studentsRepository.getReviewDetails(studentId,batchId);
            if (response) {
                return { status: true, response }
            }else{
                return {status:false,message:"studnet review details not found"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
