

export const editInvigilatorSubmit_Usecase = (dependencies: any) => {
    const {
        repository: { invigilatorRepository }
    } = dependencies;

    if (!invigilatorRepository) {
        return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (invigilatorId:string,name: string, email: string,phone:string,batch:string) => {
        try {
            const invigilatorEmailExist  = await invigilatorRepository.invigilatorEmailExist(email,phone);
            if(invigilatorEmailExist.length>0){
                return{status:false,message:"email or phoneNumber already exist"} // return not success response
            }
            const updateResponse = await invigilatorRepository.updateInvigilatorData(invigilatorId,name,email,phone,batch) //update invigilator data
      
            if(updateResponse){
                return{status:true,message:"invigilator Data updates successfully"} // return success response
            }else{
                return{status:false,message:"invigilator not found There are some issue"}
            }
        } catch (error) {
            return { status: false, message: "An unexpected error occurred" }; // handle the exception
        }
    };

    return {
        excutefunction
    };


   
};
