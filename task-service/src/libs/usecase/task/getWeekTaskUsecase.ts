import { PersonalWorkout } from "../../entities/updatePersonalWorkout";

export const getWeekTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (studentId: string,weekName:string,domain:string) => {
    try {
      if (!studentId) {
        return { status: false, message: "student not found" };
      }
      const response = await taskRepository.getWeekTask(studentId,weekName,domain);
      console.log(response);
      
      if (response.status && response.status === true) {
        return { response };
      } else {
        return { response };
      }
    } catch (err) {
      console.error(err);
      return { status: false, message: "Personal task update encountered some issues" };
    }
  };

  return executeFunction; // Return the executeFunction directly
};
