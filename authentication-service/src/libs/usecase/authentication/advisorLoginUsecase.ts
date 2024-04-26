
export const advisorLogin_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (uniqueId: string) => {
        
    if(!uniqueId){
        return {status:false,message:"uniqueId not found"}
    }
    const response = await authenticationRepository.advisorLogin(uniqueId)
    console.log(response,'response n usecase');
    
    if(!response){
      return {status:false,message:"student not found this uniqueId"}
    }else {
      return {response}
    }
  };

  return {
    executeFunction
  };
};
