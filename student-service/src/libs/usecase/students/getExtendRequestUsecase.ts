
export const getExtendRequest_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId:string) => {
    
        try {
            const response = await studentsRepository.getExtendRequest(studentId);
            if (response) {
              return {status:true,response}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Course completion graph"}
        }

    }
    return {
        executeFunction,
    };
};
