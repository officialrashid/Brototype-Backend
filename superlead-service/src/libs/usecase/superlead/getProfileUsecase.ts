

export const getProfile_Usecase = (dependencies: any) => {

    const {
        repository: { superleadRepository },
    } = dependencies;

    if (!superleadRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (superleadId: string) => {
        try {
            if(!superleadId){
                return {status:false,message:"Your Profile Not Found "}
            }
            const response = await superleadRepository.getProfile(superleadId);
            if (response.length>0) {
                console.log("usecaseeee illeeeee keriii");
                
                return { status: true, response }
            }else{
                return { status:false,message:"Not Found Your Profile"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Profile"}
        }

    }
    return {
        executeFunction,
    };
};
