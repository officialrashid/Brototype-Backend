import { addTechnicalWorkoutTask } from "../../entities/addTechnicalWorkoutsTask";

export const addTechnicalWorkoutsTask_Usecase = (dependencies: any) => {
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
        const technicalWorkoutTask = new addTechnicalWorkoutTask(data);
        const response = await taskRepository.addTechnicalWorkoutsTask(technicalWorkoutTask)
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
