import { Invigilators } from "../../../entities/invigilatorEntity";
import { sendEmail }from '../../../../nodemailer/nodemailer';

// Define the interface for InvigilatorsData
interface InvigilatorsData {
  name: string;
  email: string;
  contact: Number;
  batch: string;
  uniqueId: string;
}

export const createInvigilator_Usecase = (dependencies: any) => {
  const {
    repository: { invigilatorRepository },
  } = dependencies;

  if (!invigilatorRepository) {
    return console.log("Error: Invigilator Repository not found");
  }

  const executeFunction = async (data: InvigilatorsData) => {
    try {
      console.log(data,"dataaaaaaa");
      
      // Get the last uniqueId from the repository
      const response = await invigilatorRepository.createUniqueId();
      let lastNumber = 0;
      let newUniqueId;

      if (response && response.length > 0) {
        const lastUniqueId = response[0].uniqueId;

        if (lastUniqueId) {
          const lastNumberStr = lastUniqueId.substr(-3);
          lastNumber = parseInt(lastNumberStr, 10);
        }

        newUniqueId = `${data.batch}INV${String(lastNumber + 1).padStart(3, '0')}`;
      } else {
        newUniqueId = `${data.batch}INV${String(1).padStart(3, '0')}`;
      }

      // Check if email and phone already exist in the database
      const res = await invigilatorRepository.invigilatorEmailExist(data.email, data.contact);
      console.log(res, "Email and phone check result");

      if (!res || (res && res.length === 0)) {
        // Check if the generated uniqueId already exists
        const uniqueIdExist = await invigilatorRepository.uniqueIdExist(newUniqueId);
        console.log(uniqueIdExist, "UniqueId check result");

        // Both email and phone do not exist in the database
        if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
          // Send an email with the uniqueId
          sendEmail("Hello Invigilator, Your Unique Id", newUniqueId, data.email);

          // Create an Invigilators instance using the provided data
          const invigilator = new Invigilators({
            ...data,
            uniqueId: newUniqueId,
          });

          // Save the invigilator to the repository
          const response = await invigilatorRepository.createInvigilator(invigilator)
          return { status: true, message: "Invigilator created successfully" };
        } else {
          return { status: false, message: "UniqueId already exists" };
        }
      } else {
        return { status: false, message: "Email or phone already exists" };
      }
    } catch (error) {
      // Return an error status and message
      return { status: false, message: "An error occurred while creating the invigilator" };
    }
  };

  return {
    executeFunction,
  };
};
