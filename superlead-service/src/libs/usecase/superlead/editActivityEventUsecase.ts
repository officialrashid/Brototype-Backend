

export const editActivityEvent_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (data:any) => {
        try {
            const response = await superleadRepository.editActivityEvents(data);
            console.log(response,"response n usecasee");
            
            if (response && response !== undefined && response !== null) { 
                return {response }
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
