import { Batches } from "../../entities/batches"

export const editBatchSubmit_Usecase = (dependencies: any) => {
    const {
        repository: { fumigationRepository }
    } = dependencies;

    if (!fumigationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (batchId: string, batchName: string) => {
        try {
            const batchNameExist = await fumigationRepository.batchNameExist(batchName);
             console.log(batchName,"nabfadbfsbjhsb");
             

            if (batchNameExist.length > 0) {
                return { status: false, message: "batchName already in use" };

            } else {
                const response = await fumigationRepository.editBatchSubmit(batchId, batchName);
                return { status: true, message: "batchName update successfully" };
            }

        } catch (error) {
            console.error(error, "Error in excutefunction");
            return { status: false, message: "An unexpected error occurred" };
        }
    };

    return {
        excutefunction
    };


   
};
