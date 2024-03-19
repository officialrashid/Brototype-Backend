

export const getActivityTimeLineup_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (superleadId:string) => {
        try {
            console.log(superleadId,"superleadId superleadId");
            
            const response = await superleadRepository.getActivityTimeLineup(superleadId);
            console.log(response,"response n usecasee");
            
            if( response.status===true){
                
                return {response}
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
