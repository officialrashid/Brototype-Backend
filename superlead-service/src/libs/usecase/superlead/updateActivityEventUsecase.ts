

export const updateActivityEvent_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (data:any) => {
        try {
            const response = await superleadRepository.updateActivityEvents(data);
            console.log(response,"response n usecasee");
            
            if (response) { 
                console.log("superlead il keriii");
                 
                return {status:true ,response }
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
