import { Batches } from "../../entities/batches"

export const editInvigilatorSubmit_Usecase = (dependencies: any) => {
    const {
        repository: { fumigationRepository }
    } = dependencies;

    if (!fumigationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (invigilatorId:string,name: string, email: string,phone:string,batch:string) => {
        try {
            const invigilatorEmailExist  = await fumigationRepository.invigilatorEmailExist(email,phone);
             
            console.log(invigilatorEmailExist.email,"sfbjbfhbjbvdfjh");
            
            if(invigilatorEmailExist.length>0){
                return{status:false,message:"email or phoneNumber already exist"}
            }
            const updateResponse = await fumigationRepository.updateInvigilatorData(invigilatorId,name,email,phone,batch)
            console.log(updateResponse);
            
            if(updateResponse){
                return{status:true,message:"invigilator Data updates successfully"}
            }else{
                return{status:false,message:"invigilator not found There are some issue"}
            }
        } catch (error) {
            console.error(error, "Error in excutefunction");
            return { status: false, message: "An unexpected error occurred" };
        }
    };

    return {
        excutefunction
    };


   
};
