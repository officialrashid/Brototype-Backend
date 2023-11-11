import schema from "../dataBase/schema"


export default {

    createUniqueId: async () => {
        try {
          const response = await schema.Invigilators.find().sort({ _id: -1 }).limit(1).exec()
          return response;
        } catch (err) {
          console.log(err);
        }
    
      },
      invigilatorEmailExist: async (email: string, phone: string) => {
        try {
          const response = await schema.Invigilators.find({ $or: [{ email }, { phone }] });
          console.log(response);
    
          return response;
        } catch (err) {
          console.log(err, "error in the invigilatorEmailExist check function");
        }
    
      },
      uniqueIdExist: async (uniqueId: String) => {
        try {
          const response = await schema.Invigilators.find({ uniqueId: uniqueId })
          return response;
        } catch (err) {
          console.log(err, "error in the unueIdExist check function");
        }
    
      },
      createInvigilator: async (data: any) => {
        try {
          const invigilatorData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            batch: data.batch,
            uniqueId: data.uniqueId
    
          }
          const response = await schema.Invigilators.create(invigilatorData) //create the Enquerie Studnets
          return response;
        } catch (err) {
          console.log(err, "error in the createInvigilator fumigationRepository");
    
        }
    
      },
}