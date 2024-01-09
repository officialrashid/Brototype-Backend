import { PersonalWorkout } from "../../entities/updatePersonalWorkout";

export const getEditTaskDetails_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "task details not found,some issue edit functionality" };
      }
      const response = await taskRepository.getEditTaskDetails(data);
      
      if (response.status && response.status === true) {
        return { response };
      } else {
        return { status: false, message: "Not found updated task" };
      }
    } catch (err) {
      console.error(err);
      return { status: false, message: "Personal task update encountered some issues" };
    }
  };

  return executeFunction; // Return the executeFunction directly
};
