// Define the interface for governmentIdData
interface governmentIdData {
  studentId: any;
}

// Extend governmentIdData to include imageUrl
interface governmentIdDetails extends governmentIdData {
  studentId: string;
  imageUrl?: string;
  isGovernmentId: boolean;
}

import { uploadToS3 } from "../../../s3"; // Update the path accordingly

export const governmentIdUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { studentsRepository },
  } = dependencies;

  if (!studentsRepository) {
    return console.log("Error: Students Repository not found");
  }

  const executeFunction = async (data: governmentIdDetails, file: any) => {
    console.log(file, "))))))0000000");
    console.log(data, "+++++++++++++");

    const studentId = data.studentId;
    const isGovernmentId = true;
    if (!file || !studentId || !isGovernmentId) return { message: "Bad Request" };

    const { imageUrl } = await uploadToS3({ file, studentId, isGovernmentId });
    console.log(imageUrl, "imageUrl in usecaseeeeeee");

    const governmentIdDetails: governmentIdDetails = {
      studentId,
      imageUrl,
      isGovernmentId,
    };

    const response = await studentsRepository.governmentIdUpdate(governmentIdDetails);
    console.log(response, "profile update response in backend ddd");

    if (response) {
      console.log("response il kerriiiiittaaaaaaa");

      return { status: true, message: "governmentId updated successfully" };
    } else {
      return {
        status: false,
        message: "governmentId update not done, something went wrong",
      };
    }
  };

  return {
    executeFunction,
  };
};
