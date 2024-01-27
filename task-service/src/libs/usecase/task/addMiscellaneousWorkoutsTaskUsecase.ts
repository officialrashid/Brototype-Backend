import { addMiscellaneousWorkoutTask } from "../../entities/addMiscellaneousWorkoutsTask";

export const addMiscellaneousWorkoutsTask_Usecase = (dependencies: any) => {
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
        const miscellaneousWorkoutTask = new addMiscellaneousWorkoutTask(data);
        const response = await taskRepository.addMiscellaneousWorkoutsTask(miscellaneousWorkoutTask)
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
