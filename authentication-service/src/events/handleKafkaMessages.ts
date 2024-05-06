import dependencies from "../config/dependencies";
import { checkStudentUniqueId_Usecase } from "../libs/usecase";
import {getReviewAdvisors_Usecase} from "../libs/usecase"
import { getReviewStudents_Usecase } from "../libs/usecase";
import {updateManifestDetails_Usecase} from "../libs/usecase";
import { advisorTasks_Usecase } from "../libs/usecase";
const handleKafkaMessages = async (data: string, type: string) => {
  console.log(data,type);
  
  // Check if checkStudentUniqueId_Usecase is not null
  if(type ==='addStudents'){
    console.log(data,"data coming to the handleMessae Kafka");
  
    const useCaseInstance = checkStudentUniqueId_Usecase(dependencies);
  
    if (useCaseInstance) {
      const response = await useCaseInstance.executeFunction(data);
      console.log(response, "[][][]]");
      return response;
    } else {
      // Handle the case when checkStudentUniqueId_Usecase is null
      console.error("checkStudentUniqueId_Usecase is null");
      return null; // Or handle the error according to your needs
    }
  }
  if(type==="review-scheduler-data"){
    const useCaseInstance = getReviewAdvisors_Usecase(dependencies);
    const reviewStudentsUseCaseInstance = getReviewStudents_Usecase(dependencies)
    if (useCaseInstance && reviewStudentsUseCaseInstance) {
      const response = await useCaseInstance.executeFunction();
      const reviewStudentsResponse = await reviewStudentsUseCaseInstance.executeFunction()
      // return {response,reviewStudentsResponse};
    }else{
      // Handle the case when checkStudentUniqueId_Usecase is null
      console.error("checkStudentUniqueId_Usecase is null");
      return null; // Or handle the error according to your needs
    }
  }
  if(type==="updateProfile"){

    const useCaseInstance = updateManifestDetails_Usecase(dependencies);
    if (useCaseInstance) {
      const response = await useCaseInstance.executeFunction(data);
      // return {response,reviewStudentsResponse};
    }else{
      // Handle the case when checkStudentUniqueId_Usecase is null
      console.error("checkStudentUniqueId_Usecase is null");
      return null; // Or handle the error according to your needs
    }
  }
  if(type==="advisors-task"){
    const useCaseInstance = advisorTasks_Usecase(dependencies);
    if (useCaseInstance) {
      const response = await useCaseInstance.executeFunction(data);
      // return {response,reviewStudentsResponse};
    }else{
      // Handle the case when checkStudentUniqueId_Usecase is null
      console.error("checkStudentUniqueId_Usecase is null");
      return null; // Or handle the error according to your needs
    }
  }
  
};

export default handleKafkaMessages;
