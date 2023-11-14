
export const getStudentsMark_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (studentId:string,batchId:String,fumigationType:string) => {
    
       const response = await studentRepository.getStudentsMark(studentId,batchId,fumigationType);
 
       if (response) {
          console.log(response, "response coming in the ");
          return { response };
       }
    };
 
    return {
       excutefunction
    };
 };
 