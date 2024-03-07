
export const getStudentsAndPlacedStudents_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (uniqueId:string) => {
        const response = await authenticationRepository.getHubwiseStudentsDetails(uniqueId)
        if (response && response.length != 0) {
            console.log(response,"response in count placed studenstssssss");
            response?.response.map((data:any,index:number)=>{
                if(data.isStatus){
                    
                }
            })
            // return { status: true, response }
        } else {
            return { status: false, message: "student not found ypur hub" }
        }

    };

    return {
        executeFunction
    };
};
