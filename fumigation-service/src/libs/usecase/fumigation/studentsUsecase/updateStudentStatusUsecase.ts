
export const updateStudentStatus_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (studentId:string,batch:string,action:string) => {
       try {
          const response = await studentRepository.updateStudentStatus(studentId,batch,action); 
 
          if (response.status===true) { // check response coming or not
             return { response };
          } else {
            return {status:false,message:"student status update not succcess"}
          }
       } catch(err){
          return {status:false,message:"An Error occured get All pending students"} // handle exception
       }
       
    };
 
    return {
       excutefunction
    };
 };
 