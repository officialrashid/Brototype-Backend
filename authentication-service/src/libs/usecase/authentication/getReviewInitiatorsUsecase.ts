

export const getReviewInitiators_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    return null;
  }

  const executeFunction = async (advisorId:string,reviewerId:string,studentId:string) => {
    try {
     const response = await authenticationRepository.getReviewInitiators(advisorId,reviewerId,studentId)
      if(response.status===true){
        return {response}
      }else{
        return {response}
      }
  
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };

  return {
    executeFunction,
  };
};
