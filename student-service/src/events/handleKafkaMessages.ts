import dependencies from "../config/dependencies";


const handleKafkaMessages = async (data: string, type: string) => {

  // if(type ==='review-scheduler-data'){
  //   // const useCaseInstance = getReviewStudents_Usecase(dependencies);
  
  //   if (useCaseInstance) {
  //     const response = await useCaseInstance.executeFunction();
  //     console.log(response, "[][][]]");
  //     return response;
  //   } else {
  //     // Handle the case when checkStudentUniqueId_Usecase is null
  //     console.error("checkStudentUniqueId_Usecase is null");
  //     return null; // Or handle the error according to your needs
  //   }
  // }
  
};

export default handleKafkaMessages;
