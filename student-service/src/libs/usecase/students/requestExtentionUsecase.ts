import {Extend} from "../../entities/extentionDetails"
export const requestExtention_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (data: any) => {
        const status =false
        try {
            if(!data){
                return {status:false,message:"student data not found"}
            }
            const extend = new Extend(data,status);
            console.log(extend);
            
            const response = await studentsRepository.requestExtention(extend);
            if (response) {
                return { status: true, message:"Your extention request have been sent successfully" }
            }else{
                return {status:false,message:"something went wrong"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
