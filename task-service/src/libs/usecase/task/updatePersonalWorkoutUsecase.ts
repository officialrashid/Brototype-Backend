import { PersonalWorkout } from "../../entities/updatePersonalWorkout";

export const updatePersonalWorkout_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "student personal workout data not found" };
      }
  
      const personalWorkout = new PersonalWorkout(data);
      console.log(personalWorkout, "personal workout dataa");
      const response = await taskRepository.updatePersonalWorkout(personalWorkout);
      console.log(response);
      
      if (response.status && response.status === true) {
        return { response };
      } else {
        return { status: false, message: "Not updated task, some issue found in task updates. Please update after some time." };
      }
    } catch (err) {
      console.error(err);
      return { status: false, message: "Personal task update encountered some issues" };
    }
  };

  return executeFunction; // Return the executeFunction directly
};
