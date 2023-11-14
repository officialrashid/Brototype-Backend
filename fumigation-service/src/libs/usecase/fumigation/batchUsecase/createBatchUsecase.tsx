import { Batches } from "../../../entities/batchEntity";

export const createBatch_Usecase = (dependencies: any) => {
  const {
    repository: { batchRepository },
  } = dependencies;

  if (!batchRepository) {
    return console.log("Error: Batch Repository not found");
  }

  const excutefunction = async (batchName: String, hubLocation: String) => {
    try {
      const data = {
        batchName,
        hubLocation,
      };

      const batchNameExist = await batchRepository.batchNameExist(batchName); // call the bachNameExist function batchRepository

      if (batchNameExist.length > 0) {
        return { status: false, message: "Batch name already in use" }; // return message
      } else {
        const Batch = new Batches(data);
        const response = await batchRepository.createBatch(Batch); // create batch function anad call batch Repository

        if (response) {
          return { status: true, response }; // return success status to controller
        }
      }
    } catch (error) {
      // Handle the error here
      console.error("Error in createBatch_Usecase:", error);

      // You can choose to return a specific error message or status here
      return { status: false, message: "An error occurred while creating the batch" };
    }
  };

  return {
    excutefunction,
  };
};
