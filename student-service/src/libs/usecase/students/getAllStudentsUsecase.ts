
export const getAllStudents_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (uniqueId: string,currentPage:number) => {
        try {
            if(!uniqueId){
                return { status:false,message:"uniqueId not found"}
            }
            const response = await studentsRepository.getAllStudents(uniqueId,currentPage)
       
            
            if(response && response.length !=0){
                console.log("usecaseil kerrrriiiiii");
                
                return {status:true,response}
            }else{
                return {status:false,message:"student not found Your Hub"}
            }
        } catch (err) {
            return { status: false, message: "The Some issue in the get Course completion graph" }
        }

    }
    return {
        executeFunction,
    };
};
