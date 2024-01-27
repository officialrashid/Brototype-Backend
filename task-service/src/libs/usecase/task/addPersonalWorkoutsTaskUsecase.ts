import { addPersonalWorkoutTask } from "../../entities/addPersonalWorkoutsTask";

export const addPersonalWorkoutsTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: any) => {
    try {
        if(!data){
          return {status:false,message:"task data not get"}
        }
        const personalWorkoutTask = new addPersonalWorkoutTask(data);
        const response = await taskRepository.addPersonalWorkoutsTask(personalWorkoutTask)
        if(response){
          return {response}
        }else{
         return {status:false,message:"Task Not Created,Try Again After Some Times"}
        }
    } catch (error) {
        
    }
  };

  return executeFunction; // Return the executeFunction directly
};
