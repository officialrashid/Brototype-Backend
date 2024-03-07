// Define the interface for InvigilatorsData
interface StudentsData {
  superleadId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  hubLocation: String;
  qualification: String;
  pastYourWorkedCompany: String;
  yearOfExpereience: String
}

interface ProfileUpdate extends StudentsData {
  superleadId: string;
  imageUrl: any;
}

import { uploadToS3 } from "../../../s3"; // Update the path accordingly

export const profileUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { superleadRepository },
  } = dependencies;

  if (!superleadRepository) {
    return console.log("Error: Students Repository not found");
  }

  const executeFunction = async (data: StudentsData, file: any) => {
    const superleadId = data.superleadId;
    if (!file || !superleadId) return { message: "Bad Request" };

    const { imageUrl } = await uploadToS3({ file, superleadId });

    const profileData: ProfileUpdate = {
      superleadId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      hubLocation: data.hubLocation,
      qualification: data.qualification,
      pastYourWorkedCompany: data.pastYourWorkedCompany,
      yearOfExpereience: data.yearOfExpereience,
      imageUrl,
    };

    const emailPhoneCheckResult = await superleadRepository.checkEmailAndPhone(data?.email,data?.phone);
    if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {
          const response = await superleadRepository.updateProfile(profileData);
          if (!response) {
            return { status: false, message:"Persanal Details update not done, something went wrong" }
               // return success status to controller
            }else{
              return { status: true, message:"profile Update Successfully", response };
            }
      }else{
        return {status:false,message:"Email or Phone already in use"}
      }
  }
  

  return {
    executeFunction,
  };
};
