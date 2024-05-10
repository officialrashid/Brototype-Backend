
export const advisorGoogleLogin_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (email: string) => {
          
      if(!email){
          return {status:false,message:"email not found"}
      }
      const response = await authenticationRepository.advisorGoogleLogin(email)
      console.log(response,'response n usecase');
      
      if(response.status===false){
        return {status:false,message:"advisor not found"}
      }else {
        return {response}
      }
    };
  
    return {
      executeFunction
    };
  };
  