

export const getChatAllSuperleads_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async () => {
        try {
            const response = await superleadRepository.getAllChatSuperleads();
            console.log(response,"response n usecasee");
            
            if (response.status===true) { 
                console.log("superlead il keriii");
                 
                return { response }
            }else{
                return { status:false,message:"superleads not found"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
