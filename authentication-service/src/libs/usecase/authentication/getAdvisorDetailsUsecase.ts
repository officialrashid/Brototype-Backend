
export const getAdvisorDetails_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (advisorId: string) => {
          
      if(!advisorId){
          return {status:false,message:"advisor not found"}
      }
      console.log("usecaseee ilan get advisrorrrr",advisorId);
      
      const response = await authenticationRepository.getAdvisorDetails(advisorId)
      if(response.status===true){
        return {response}
      }else {
        return {response}
      }
    };
  
    return {
      executeFunction
    };
  };
  