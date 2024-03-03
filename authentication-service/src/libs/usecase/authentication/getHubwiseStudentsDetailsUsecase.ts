
export const getHubwiseStudentsDetails_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (uniqueId: string) => {
        let studentsCount = 0;
        let terminateCount = 0;
        let quitCount = 0;
        let reviewersCount = 0;
        if (!uniqueId) {
            return { status: false, message: "uniqueId not found" }
        }
        const response = await authenticationRepository.getHubwiseStudentsDetails(uniqueId)
        const reviewers = await authenticationRepository.getAllReviewers()
        // const advisors = await authenticationRepository.getAllReviewersCount()
 
    
        if (response && response.length != 0 || reviewers && reviewers.length > 0) {
           response?.response?.map((students:any,index:number)=>{
                if(students.isStatus === 'Terminate'){
                    terminateCount++;
                }
                if(students.isStatus === 'Quit'){
                    quitCount++; 
                }
                if(students.isStatus=== 'Active'){
                    studentsCount++;
                }
           })
           if (reviewers && reviewers.length > 0) {
               reviewersCount = reviewers.length;   
           }else{
             return {status:false,message:"Reviewers not found"}
           }
           return {status:true,studentsCount,terminateCount,quitCount,reviewersCount}
        } else {
            return { status: false, message: "student not found your hub" }
        }
       

    };

    return {
        executeFunction
    };
};
