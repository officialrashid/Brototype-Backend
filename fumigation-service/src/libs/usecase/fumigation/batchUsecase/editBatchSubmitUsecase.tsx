

export const editBatchSubmit_Usecase = (dependencies: any) => {
    const {
        repository: { batchRepository }
    } = dependencies;

    if (!batchRepository) {
        return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (batchId: string, batchName: string) => {
        try {
            const batchNameExist = await batchRepository.batchNameExist(batchName); //call the batchName Exist function 
             console.log(batchName,"nabfadbfsbjhsb");
             

            if (batchNameExist.length > 0) {
                return { status: false, message: "batchName already in use" }; // return message 

            } else {
                const response = await batchRepository.editBatchSubmit(batchId, batchName); //edit submit function define in batchRepository
                return { status: true, message: "batchName update successfully" }; // return success message
            }

        } catch (error) {
            console.error(error, "Error in excutefunction");
            return { status: false, message: "An unexpected error occurred" }; // hadle exception
        }
    };

    return {
        excutefunction
    };


   
};
