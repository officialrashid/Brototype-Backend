
export const getExtendDetails_Usecase = (dependencies: any) => {

    const {
        repository: { studentsRepository },
    } = dependencies;

    if (!studentsRepository) {
        return console.log("Error: student Repository not found");
    }

    const executeFunction = async (studentId: string,batchId:string) => {
        let currentWeek =0
        try {
            const response = await studentsRepository.getExtendDetails(studentId,batchId);
            if (response) {
              
                
             response.map((data:any,index:number)=>{
                 if(data.status===true){
                    currentWeek ++;
                 }
             })
             if(currentWeek){
                const response = await studentsRepository.getProfile(studentId)
                console.log(response[0].firstName,"{}{}{}{}{}{}{}{}");
                if(response.length>0){
                    const data = {
                        firstName : response[0].firstName,
                        middleName: response[0].middleName,
                        lastName : response[0].lastName,
                        batch : response[0].batch,
                        domain : response[0].domain,
                        currentWeek: `week${currentWeek+1}`
                    }
                    return {status:true,data}
                }else{
                    return {status:false,message:"student details not get"}
                }
                
             }else{
                return {status: false, message:"student have not a week,something issue"}
             }
           
               
            }else{
                return {status:false,message:"student extend details not found"}
            }
        } catch (err) {
           return {status:false,message:"The Some issue in the get Course completion graph"}
        }

    }
    return {
        executeFunction,
    };
};
