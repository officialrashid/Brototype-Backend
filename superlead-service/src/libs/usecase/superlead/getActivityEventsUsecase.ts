

export const getActivityEvents_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (superleadId:string) => {
        try {
            const response = await superleadRepository.getAllActivityEvents(superleadId);
            console.log(response,"response n usecasee");
            
            if(response.length > 0){
                return {status:true,response}
              }else{
                return {status:false,message:"Schedule Activity Events not found"}
              }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
