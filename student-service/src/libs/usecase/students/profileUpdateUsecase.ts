// Define the interface for InvigilatorsData
interface StudentsData {
  studentId: any;
  firstName: string;
  lastName: string;
  domain: string;
  batch: string;
}

interface ProfileUpdate extends StudentsData {
  studentId: string;
  imageUrl : any
}

import { uploadToS3 } from "../../../s3"; // Update the path accordingly

export const profileUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { studentsRepository },
  } = dependencies;

  if (!studentsRepository) {
    return console.log("Error: Students Repository not found");
  }

  const executeFunction = async (data: StudentsData, file: any) => {
    console.log(file, "))))))0000000");
    console.log(data, "+++++++++++++");

    // let imageUrl;

    const studentId = data.studentId;
    if (!file || !studentId) return { message: "Bad Request" };

   const {imageUrl}= await uploadToS3({ file, studentId });
 console.log(imageUrl,"imageUrl in  usecaseeeeeee");
 
    const profileData: ProfileUpdate = {
      studentId,
      firstName: data.firstName,
      lastName: data.lastName,
      domain: `${data.domain} developer`,
      batch: data.batch,
      imageUrl,
    };

    const response = await studentsRepository.profileUpdate(profileData);
    console.log(response, "profile update response in backend ddd");

    if (response) {
      console.log("response il kerriiiiittaaaaaaa");

      return { status: true, message: "profile updated successfully" };
    } else {
      return {
        status: false,
        message: "profile update not done, something went wrong",
      };
    }
  };

  return {
    executeFunction,
  };
};
