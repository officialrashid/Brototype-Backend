
export const getStudentProfile_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (studentId: string) => {
          
      if(!studentId){
          return {status:false,message:"student not found"}
      }
      const response = await authenticationRepository.getStudentProfile(studentId)
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
  