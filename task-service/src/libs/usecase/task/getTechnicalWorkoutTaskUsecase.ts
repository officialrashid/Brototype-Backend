import { PersonalWorkout } from "../../entities/updatePersonalWorkout";

export const getTechnicalWorkoutTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (domain:string,week: any) => {
    try {
      if (!week) {
        return { status: false, message: "week not found" };
      }
      const response = await taskRepository.getTechnicalWorkout(domain,week);
      console.log(response,"respone for task");
      
      if (response.status && response.status === true) {
        return { response };
      } else {
        return { status: false, message: "Not found task" };
      }
    } catch (err) {
      console.error(err);
      return { status: false, message: "Personal task encountered some issues" };
    }
  };

  return executeFunction; // Return the executeFunction directly
};
