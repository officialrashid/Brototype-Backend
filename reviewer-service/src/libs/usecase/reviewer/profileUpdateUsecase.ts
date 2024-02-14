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
  imageUrl?: any;
}

import {uploadToS3 } from "../../../s3";



export const profileUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { reviewerRepository },
  } = dependencies;

  if (!reviewerRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (data: reviewersData, file: any) => {

    const reviewerId = data.reviewerId
    if (!file || !reviewerId) return { message: "Bad Request" };

    const { imageUrl } = await uploadToS3({ file,reviewerId });
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
