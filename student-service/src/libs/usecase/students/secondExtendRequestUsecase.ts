import {Extend} from "../../entities/extentionDetails"
export const secondExtendRequest_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (extendId: string) => {
        try {
            if(!extendId){
                return {status:false,message:"student data not found"}
            }
            const response = await studentsRepository.secondExtendRequest(extendId);
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
