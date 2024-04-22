import { response } from "express";
import schema from "../dataBase/schema"


export default {

  profileUpdate: async (profileData: { studentId: any; imageUrl: any; firstName: any; lastName: any; domain: any; batch: any; }) => {
    try {
      // Check if the profile with the given studentId exists
      const existingProfile = await schema.Manifest.findOne({
        studentId: profileData.studentId
      });

      if (existingProfile) {
        // If profile exists, update specific fields with the new data
        const updatedProfile = await schema.Manifest.findOneAndUpdate(
          { studentId: profileData.studentId },
          {
            $set: {
              imageUrl: profileData.imageUrl || existingProfile.imageUrl,
              firstName: profileData.firstName || existingProfile.firstName,
              lastName: profileData.lastName || existingProfile.lastName,
              domain: profileData.domain || existingProfile.domain,
              batch: profileData.batch || existingProfile.batch,
              // Add other fields here if needed
            }
          },
          { new: true }
        );

        return updatedProfile;
      } else {
        // If profile doesn't exist, create a new profile
        const newProfile = await schema.Manifest.create(profileData);
        return newProfile;
      }
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }
  },
  governmentIdUpdate: async (governmentIdData: { studentId: string; imageUrl: any; }) => {
    try {
      console.log(governmentIdData, "governmentID data ocmniggg");

      // Check if the profile with the given studentId exists
      const existingGovernmentId = await schema.Manifest.findOne({
        studentId: governmentIdData.studentId
      });
      console.log(existingGovernmentId, "existing govermnet Id");

      if (existingGovernmentId) {
        // If profile exists, update specific fields with the new data
        const updatedGovernmentId = await schema.Manifest.findOneAndUpdate(
          { studentId: governmentIdData.studentId },
          {
            $set: {
              governmentIdImageUrl: governmentIdData.imageUrl || existingGovernmentId.governmentIdImageUrl,
            }
          },
          { new: true }
        );

        return updatedGovernmentId;
      } else {
        // If profile doesn't exist, create a new profile
        const newGovernmentId = await schema.Manifest.create(governmentIdData);
        return newGovernmentId;
      }
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }
  },

  getProfile: async (studentId: string) => {
    console.log(studentId, "studentId coming or not check log");
    try {
      const response = await schema.Manifest.find({ studentId: studentId })
      return response
    } catch (err) {

    }
  },
  studentEmailAndPhoneExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Manifest.find({ $or: [{ email }, { phone }] });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }

  },
  checkPrentsPhoneExist: async (fathersContact: number, mothersContact: number) => {
    try {
      const response = await schema.Manifest.find({ $or: [{ fathersContact }, { mothersContact }] })
      return response;
    } catch (err) {
      return { status: false, message: "Error in the parents phone number check" }
    }
  },
  updatePersonalDetails: async (data: any, studentId: string) => {
    console.log("cominggggg");

    try {
      const existingProfile = await schema.Manifest.findOne({ studentId: studentId });

      if (existingProfile) {
        // If the profile exists, update it with the provided data
        const updatedProfile = await schema.Manifest.findOneAndUpdate(
          { studentId: studentId },
          data,
          { new: true }
        );

        return updatedProfile;
      } else {
        // If the profile doesn't exist, create a new one
        const newProfile = await schema.Manifest.create({
          ...data,
          studentId: studentId
        });

        return newProfile;
      }
    } catch (err) {
      return { status: false, message: "Error in updating personal details" };
    }
  },

  updateAddressDetails: async (data: any, studentId: string) => {
    console.log(data, studentId, 'address detail coming bakcenddddd');

    try {
      const existingProfile = await schema.Manifest.findOne({ studentId: studentId });
      if (existingProfile) {
        // If the profile exists, update it with the provided data
        const updatedProfile = await schema.Manifest.findOneAndUpdate(
          { studentId: studentId },
          data,
          { new: true }
        );

        return updatedProfile;
      } else {
        // If the profile doesn't exist, create a new one
        const newProfile = await schema.Manifest.create({
          ...data,
          studentId: studentId
        });

        return newProfile;
      }
    } catch (err) {
      return { status: false, message: "Error in the update address details" }
    }
  },
  updateEducationDetails: async (data: any, studentId: string) => {
    try {

      const existingProfile = await schema.Manifest.findOne({ studentId: studentId });
      if (existingProfile) {
        // If the profile exists, update it with the provided data
        const updatedProfile = await schema.Manifest.findOneAndUpdate(
          { studentId: studentId },
          data,
          { new: true }
        );

        return updatedProfile;
      } else {
        // If the profile doesn't exist, create a new one
        const newProfile = await schema.Manifest.create({
          ...data,
          studentId: studentId
        });

        return newProfile;
      }

    } catch (err) {
      return { status: false, message: "Error in the update education details" }
    }
  },
  getAllStudentDetails: async (batchId: string) => {
    console.log(batchId, "Batch ID coming in");

    try {
      // Use the Mongoose model to find the desired data
      const response = await schema.WeekRecord.find({ batchId: batchId });

      console.log(response, "Retrieved all student details");
      return response;
    } catch (err) {
      console.error('Error in getting all student details:', err);
      return { status: false, message: "Error in the getting all student details" };
    }
  },
  getWeeklyPerformance: async (studentId: string, batchId: string) => {
    try {
      const batch = await schema.WeekRecord.findOne({ batchId });

      if (!batch) {
        return { status: false, message: "Batch not found" };
      }

      const student = batch.students.find((s) => s.studentId === studentId);

      if (!student) {
        return { status: false, message: "Student not found in the batch" };
      }

      const weeklyPerformances = student.weeks.filter((week) => week.status === true);

      if (weeklyPerformances.length === 0) {
        return { status: false, message: "No weekly performance found with status true for the student" };
      }

      return { status: true, data: weeklyPerformances };
    } catch (err) {
      return { status: false, message: "Error in getting weekly performance" };
    }
  },


  getCourseCompletion: async (studentId: string, batchId: string) => {
    console.log(studentId, batchId, "backend course completion data cominggggggg");

    try {
      const batch = await schema.WeekRecord.findOne({ batchId });
      if (!batch) {
        return { status: false, message: "Batch not found" };
      }

      const student = batch.students.find((s) => s.studentId === studentId);
      if (!student) {
        return { status: false, message: "Student not found in this batch" };
      }

      // Count the number of completed weeks
      const completedWeeks = student.weeks.reduce((count, week) => (week.status ? count + 1 : count), 0);
      console.log(student.totalWeeks, "||||||||||||||||||||||||");

      // Calculate the percentage of completed weeks
      const percentageCompleted = (completedWeeks / student.totalWeeks) * 100;

      return { status: true, completedWeeks, percentageCompleted };
    } catch (err) {
      return { status: false, message: "Error in Course Completion" };
    }

  },
  getAllPerformance: async (studentId: string, batchId: string) => {
    try {
      const batch = await schema.WeekRecord.findOne({ batchId })
      if (!batch) {
        return { status: false, message: "batch not found" }
      }
      const student = batch.students.find((s: any) => s.studentId === studentId);

      if (!student) {
        return { status: false, message: "student not found in this batch " }
      }
      const allPerformance = student.weeks
      if (allPerformance.length > 0) {
        return { status: true, allPerformance }
      } else {
        return { status: false, message: "student not week  found" }
      }

    } catch (err) {
      return { status: false, message: "Error in the student get all performance" }
    }
  },
  getExtendDetails: async (studentId: string, batchId: string) => {

    try {

      const batch = await schema.WeekRecord.findOne({ batchId })
      if (!batch) {
        return { status: false, message: "batch not found" }
      }
      const student = await batch.students.find((s) => s.studentId === studentId)
      if (!response) {
        return { status: false, message: "student not found in this batch" }
      }
      const currentWeeks = student?.weeks
      return currentWeeks;

    } catch (err) {
      return { status: false, message: "some issues in get extend details" }
    }
  },
  requestExtention: async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "student extend data not get" }
      }
      const response = await schema.Extend.create(data)
      return response;
    } catch (error) {
      return { status: false, error: error }
    }
  },
  getExtendRequest: async (studentId: string) => {
    try {
      const student = await schema.Extend.find({ studentId: studentId })
      if (!student) {
        return { status: false, message: "student not found" }
      }
      return student;
    } catch (error) {
      return { status: false, error }
    }
  },
  getReviewDetails: async (studentId: string, batchId: string) => {
    console.log(studentId, batchId, "{}{++++++)(****");

    try {
      const batch = await schema.WeekRecord.findOne({ batchId })
      if (!batch) {
        return { status: false, message: "batch not found" }
      }
      const student = batch.students.find((s) => s.studentId === studentId)
      if (!student) {
        return { status: false, message: "student not found" }
      }
      const response = student.weeks
      console.log(response, "review detals coming");

      if (response.length > 0) {
        return response
      } else {
        return { status: false, message: "student week not found" }
      }
    } catch (error) {
      return { status: false, message: "get review details some issue found" }
    }
  },
  secondExtendRequest: async (extendId: string) => {
    try {
      if (!extendId) {
        return { status: false, message: "Extend request ID not provided" };
      }

      const extendRequest = await schema.Extend.findOneAndUpdate(
        { _id: extendId },
        {
          $set: {
            requestCount: 2,
            priority: true,
          },
        },
        { new: true }
      );

      if (extendRequest) {
        return { status: true, message: "Extend request updated successfully", data: extendRequest };
      } else {
        return { status: false, message: "Extend request not found" };
      }
    } catch (error) {
      return { status: false, message: "Error in updating extend request", error: error };
    }
  },
  getBestStudentsDetails: async (studentId: string) => {
    console.log(studentId, "student iddssssssss");

    try {
      if (!studentId) {
        return { status: false, message: "Student not found" };
      }

      // Use findOne to get a single document based on the provided query
      const response = await schema.Manifest.findOne({ studentId });


      if (response) {
        const studentName = `${response.firstName} ${response.lastName}`;
        const studentProfile = response.imageUrl
        return { studentName, studentProfile };
      } else {
        return { status: false, message: "Student not found in the manifest" };
      }
    } catch (error) {
      // Handle any errors that may occur during the database query
      return { status: false, message: "Error fetching student details" };
    }
  },
  getStudentCurrentWeek: async (studentId: string, batchId: string) => {
    try {
      if (!batchId) {
        return { status: false, message: "Batch not found" };
      }

      // Find the batch based on batchId
      const batch = await schema.WeekRecord.findOne({ batchId });
      if (!batch) {
        return { status: false, message: "Batch not found" };
      }

      // Find the student in the batch
      const student = batch.students.find((s) => s.studentId === studentId);
      if (!student) {
        return { status: false, message: "Student not found in the batch" };
      }

      // Count the number of weeks with status true
      const passedWeeksCount = student.weeks.reduce((count, week) => {
        if (week.status === true) {
          count++;
        }
        return count;
      }, 0);

      return { status: true, passedWeeksCount };
    } catch (error) {
      console.error("Error in getStudentPassedWeeksCount:", error);
      return { status: false, message: "Internal server error" };
    }
  },
  getAllStudents: async (uniqueId: string, currentPage: number) => {
    console.log(uniqueId, "uniqueId cominggg");

    try {
      // Find the index of 'M' in the uniqueId
      const indexM = uniqueId.indexOf('M');

      // Extract the prefix (all characters before 'M')
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;
      console.log(uniqueLetters, "uniqueLetters");

      // Calculate the number of documents to skip based on the currentPage
      const pageSize = 10; // Number of students per page
      const skip = (currentPage - 1) * pageSize;

      // Match documents where uniqueId starts with the extracted prefix
      const result = await schema.Manifest.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' } // Using a regex to match the prefix case-insensitively
          }
        },
        // Pagination: Skip and limit the number of documents returned
        { $skip: skip },
        { $limit: pageSize }
      ]);

      const response = await schema.WeekRecord.aggregate([
        // Unwind the students array to deconstruct it into separate documents
        { $unwind: "$students" },
        // Match only documents where the status is true and repeat is false
        {
          $match: {
            "students.weeks.status": true,
            "students.weeks.repeat": false
          }
        },
        // Group by studentId to regroup documents by their original studentId
        {
          $group: {
            _id: "$students.studentId",
            lastWeek: { $last: "$students.weeks.week" } // Get the last week where repeat is false
          }
        },
        // Project to include only the studentId and current week
        {
          $project: {
            _id: 0,
            studentId: "$_id",
            currentWeek: { $arrayElemAt: ["$lastWeek", -1] } // Extract the first (and only) element of the array
          }
        },

      ]);

      if (result.length > 0 && response.length > 0) {
        console.log("kerriiiiiiii", response);

        return { students: result, studentCurrentWeek: response }
      } else {
        return { message: "students not found" }
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for further handling if needed
    }
  },
  getPerPageStudents: async (uniqueId: string, perPage: number) => {
    try {
      if (!uniqueId) {
        return { status: false, message: "Superlead not found in your hub" };
      }

      const indexM = uniqueId.indexOf('M');
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;

      const result = await schema.Manifest.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' }
          }
        },
        {
          $limit: parseInt(perPage.toString())
        }
      ]).exec();
      const response = await schema.WeekRecord.aggregate([
        // Unwind the students array to deconstruct it into separate documents
        { $unwind: "$students" },
        // Match only documents where the status is true and repeat is false
        {
          $match: {
            "students.weeks.status": true,
            "students.weeks.repeat": false
          }
        },
        // Group by studentId to regroup documents by their original studentId
        {
          $group: {
            _id: "$students.studentId",
            lastWeek: { $last: "$students.weeks.week" } // Get the last week where repeat is false
          }
        },
        // Project to include only the studentId and current week
        {
          $project: {
            _id: 0,
            studentId: "$_id",
            currentWeek: { $arrayElemAt: ["$lastWeek", -1] } // Extract the first (and only) element of the array
          }
        },

      ]);
      console.log(result,"nxsbcmsdbfsdfjsdhfsdhfdsjfsdjhfsdhdsdshysdufysud");
      if (result.length > 0 && response.length > 0) {
        console.log(result,"nxsbcmsdbfsdfjsdhfsdhfdsjfsdjhfsdhdsdshysdufysud");
        
        return { students: result, studentCurrentWeek: response }
    } else{
      return {status:false,message:"per page student not found"}
    }
  } catch (error) {
      console.error(error);
      return { status: false, message: "Error in fetching per page students" };
    }
  },
  getAllChatStudents: async (uniqueId:string) => {
    try {
      const indexM = uniqueId.indexOf('M');
  
      // Extract the prefix (all characters before 'M')
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;
      console.log(uniqueLetters, "uniqueLetters");
      
      const result = await schema.Manifest.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' } // Using a regex to match the prefix case-insensitively
          }
        },
        {
          $project: {
            studentId:1,
            imageUrl: 1,
            firstName: 1,
            lastName: 1,
            phone: 1
          }
        }
      ]);
      
      // Return the result
      return result;
    } catch (error) {
      return { status: false, message: "students not get chat section" };
    }
  }
  
}
