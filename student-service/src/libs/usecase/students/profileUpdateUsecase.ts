// Define the interface for InvigilatorsData
interface studentsData {
  firstName: string;
  lastName: string;
  domain: string;
  batch: string;
}

interface ProfileUpdate extends studentsData {
  studentId: string;
  imageUrl?: string;
}

import { getUserPresignedUrls, uploadToS3 } from "../../../s3";

interface S3UploadResult {
  err?: Error;
  key?: string;
}

export const profileUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { studentsRepository },
  } = dependencies;

  if (!studentsRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: studentsData, file: any) => {
    console.log(file, "))))))0000000");
    console.log(data, "+++++++++++++");

    let imageUrl;

    const studentId = "6554ebfd54c3fe96a75c7752";
    if (!file || !studentId) return { message: "Bad Request" };

    const { err, key } = await uploadToS3({ file,studentId });
    if (err) return { message: err.message };

    if (key) {
      await getUserPresignedUrls(studentId)
        .then(({ err, signedUrls }) => {
          if (err) {
            console.error(err);
          } else {
            console.log(signedUrls, "[][][][][]");

            imageUrl = signedUrls;
          }
        })
        .catch((error) => console.error(error));
    }

    const profileData: ProfileUpdate = {
      studentId,
      firstName: data.firstName,
      lastName: data.lastName,
      domain: data.domain,
      batch: data.batch,
      imageUrl,
    };

    const response = await studentsRepository.profileUpdate(profileData);
    if(response){
      console.log(response,"98987878997978796");
      
    }
  };

  return {
    executeFunction,
  };
};
