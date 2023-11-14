

export const getAllBatch_Usecase = (dependencies: any) => {
   const {
      repository: { batchRepository }
   } = dependencies;

   if (!batchRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async () => {
      try{
         const response = await batchRepository.getAllBatches(); // call  getAllBatch function
         if (response) {
            return {status:true,response }; // return response
         }
      } catch(err){
         return {status:false,message : "An Error Occured while get All Batch usecase"} // handle exception
      }
     
   };

   return {
      excutefunction
   };
};
