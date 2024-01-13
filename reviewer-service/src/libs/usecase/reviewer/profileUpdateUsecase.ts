// Define the interface for InvigilatorsData
interface reviewersData {
  reviewerId: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
}

interface ProfileUpdate extends reviewersData {
  reviewerId: string;
  imageUrl?: string;
}

import { getUserPresignedUrls, uploadToS3 } from "../../../s3";

interface S3UploadResult {
  err?: Error;
  key?: string;
}

export const profileUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository },
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: reviewersData, file: any) => {
    console.log(file, "))))))0000000");
    console.log(data, "+++++++++++++");

    let imageUrl;

    const reviewerId = data.reviewerId
    if (!file || !reviewerId) return { message: "Bad Request" };

    const { err, key } = await uploadToS3({ file,reviewerId });
    if (err) return { message: err.message };

    if (key) {
      await getUserPresignedUrls(reviewerId)
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
      reviewerId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      age:data.age,
      gender: data.gender,
      imageUrl,
    };

    const response = await reviewerRepository.profileUpdate(profileData);
    if(response){
      return {status:true,message:"profile updated successfully"}
      
    }else{
      return {status:false,message:"profile update not done"}
    }
  };

  return {
    executeFunction,
  };
};
