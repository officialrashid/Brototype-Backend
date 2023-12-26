// import { Invigilators } from "../../entities/students";
import { sendEmail } from "../../../nodemailer/nodemailer";
// Define the interface for InvigilatorsData
interface InvigilatorsData {
  name: string;
  email: string;
  phone: string;
  batch: string;
  uniqueId: string;
}

export const createInvigilator_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: InvigilatorsData) => {
  //   const response = await authenticationRepository.createUniqueId();
  //   let lastNumber = 0;
  //   let newUniqueId;

  //   if (response && response.length > 0) {
  //     const lastUniqueId = response[0].uniqueId;
  //     if (lastUniqueId) {
  //       const lastNumberStr = lastUniqueId.substr(-3);
  //       lastNumber = parseInt(lastNumberStr, 10);
  //     }
  //     newUniqueId = `${data.batch}INV${String(lastNumber + 1).padStart(3, '0')}`;
  //   } else {
  //     newUniqueId = `${data.batch}INV${String(1).padStart(3, '0')}`;
  //   }
  //   const res = await authenticationRepository.invigilatorEmailExist(data.email, data.phone)
  //   console.log(res, "hhghgh");

  //   if (!res || (res && res.length === 0)) {

  //     const uniqueIdExist = await authenticationRepository.uniqueIdExist(newUniqueId)
  //     console.log(uniqueIdExist, "oooooooo");

  //     // Both email and phone do not exist in the database
  //     if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
  //       sendEmail("Hello INvigilator Your Unique Id", newUniqueId, data.email);

  //       // const invigilator = new Invigilators({
  //       //   ...data,
  //       //   uniqueId: newUniqueId,
  //       // });

  //       const response = await authenticationRepository.createInvigilator(invigilator);
  //       console.log(response, "response in usecase after creating invigilator");
  //       return { status: true, message: "invigilators create successfully" }
  //     } else {
  //       console.log("uniqueId already in the database");
  //       return { status: false, message: "uniqueId already done" }
  //     }

  //   } else {
  //     console.log("Email or phone already exists in the database");
  //     return { status: false, message: "Email or phone already exists " }
  //   }
  //   // Now, create an Invigilators instance using the provided data

  };

  return {
    executeFunction
  };
};
