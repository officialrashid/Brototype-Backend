

export const advisorTasks_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    return null;
  }

  const executeFunction = async (data:any) => {
    try {
     const response = await authenticationRepository.advisorTasks(data)
  
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing advisor tasks" };
    }
  };

  return {
    executeFunction,
  };
};
