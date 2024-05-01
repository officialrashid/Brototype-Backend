
export const getAllAdvisors_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async () => {

      const response = await authenticationRepository.getAllAdvisors()
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
  