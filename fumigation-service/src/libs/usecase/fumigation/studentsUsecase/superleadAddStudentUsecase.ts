

export const superleadAddStudent_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (data:any) => {
        try{
            console.log(data,"data coming yarrr");
            
          const response = await studentRepository.getBatchId(data?.batch);
          if (response.status === true) {
            const addStudentData = {
              ...data,
              batchId: response.batchId
            };
            const sendDataAuthServResponse = await studentRepository.sendAllDataToAuth(addStudentData)
            console.log(sendDataAuthServResponse,"llllllllll");
            
            if(sendDataAuthServResponse.status===true){
                console.log("keriyanuuuuuuu");
                
                return {sendDataAuthServResponse}
            }else{
                const sendDataAuthServResponse = {
                    status:false,
                    message:"student not created"
                }
                return {sendDataAuthServResponse}
            }
          }else{
            const sendDataAuthServResponse = {
                status:false,
                message:"student not created because of batch not found"
            }
            return {sendDataAuthServResponse}
          }
        } catch(err){
          return{status:false,message:"An Error occurred addStudents Usecase"}
        }
       
    };
 
    return {
       excutefunction
    };
 };
 