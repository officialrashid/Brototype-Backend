import { PersonalWorkout } from "../../entities/updatePersonalWorkout";

export const getPersonalWorkoutTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (week: any) => {
    try {
      if (!week) {
        return { status: false, message: "week not found" };
      }
      const response = await taskRepository.getPersonalWorkout(week);
      console.log(response);
      
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
