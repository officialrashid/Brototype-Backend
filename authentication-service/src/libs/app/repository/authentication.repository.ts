import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import mongoose from "mongoose";
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});
interface MonthlyStudentsCount {
  month: number;
  currentStudents: number;
  placedStudents: number;
}
export default {

  createUniqueId: async () => {
    try {
      const response = await schema.Students.find().sort({ _id: -1 }).limit(1).exec()
      return response;
    } catch (err) {
      console.log(err);
    }

  },
  studentEmailExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Students.find({ $or: [{ email }, { phone }] });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }

  },
  uniqueIdExist: async (uniqueId: String) => {
    try {
      const response = await schema.Students.find({ uniqueId: uniqueId })
      return response;
    } catch (err) {
      console.log(err, "error in the unueIdExist check function");
    }

  },


  createStudents: async (data: any, uniqueId: string) => {
    console.log(data, "++++++6666666");
    try {
      let studentId;
      if (!data.studentId) {
        // Generate a random studentId using ObjectId
        studentId = new mongoose.Types.ObjectId().toHexString();
      } else {
        studentId = data.studentId;
      }

      const studentData = {
        studentId: studentId,
        batchId: data.batchId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        batch: data.batch,
        uniqueId: uniqueId,
      };

      console.log(studentData, "The funcing Data");

      const response = await schema.Students.create(studentData);
      console.log(response, "Student created successfully");

      return { status: true, message: "Students created successfully" };
    } catch (err) {
      console.error(err, "Error in creating students");
      throw err;
    }
  },

  studentLogin: async (uniqueId: string) => {
    try {

      const student = await schema.Students.findOne({ uniqueId });

      if (student) {
        console.log(student);

        const students = {
          _id: student._id.toString(),
          name: student.name?.toString(),
          email: student.email?.toString()
        };

        const accessToken = await jwt.sign(students, config.secretKey, { expiresIn: '7d' });
        if (accessToken) {
          const uid = students._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { student, accessToken, customToken };
          } else {
            return { status: false, message: "student not found" }
          }
        } else {
          return { status: false, message: "your access denied some time wait" }
        }
      } else {
        return { status: false, message: "student not found" }
      }
    } catch (error) {
      return { error: 'Internal server error' };
    }
  },
  reviewerLogin: async (uniqueId: string) => {
    try {

      const reviewer = await schema.Reviewers.findOne({ uniqueId });

      if (reviewer) {
        console.log(reviewer);

        const reviewers = {
          _id: reviewer._id.toString(),
          name: reviewer.firstName?.toString(),
          email: reviewer.email?.toString()
        };

        const accessToken = await jwt.sign(reviewers, config.secretKey, { expiresIn: '1d' });
        if (accessToken) {
          const uid = reviewers._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { reviewer, accessToken, customToken };
          } else {
            return { status: false, message: "reviewer not found" }
          }
        } else {
          return { status: false, message: "your access denied some time wait" }
        }
      } else {
        return { status: false, message: "reviewer not found" }
      }
    } catch (error) {
      return { error: 'Internal server error' };
    }
  },
  superleadLogin: async (uniqueId: string) => {
    try {

      const superlead = await schema.Superleads.findOne({ uniqueId });

      if (superlead) {
        console.log(superlead);

        const superleads = {
          _id: superlead._id.toString(),
          name: superlead.name?.toString(),
          email: superlead.email?.toString()
        };

        const accessToken = await jwt.sign(superleads, config.secretKey, { expiresIn: '7d' });
        if (accessToken) {
          const uid = superleads._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { superlead, accessToken, customToken };
          } else {
            return { status: false, message: "superlead not found" }
          }
        } else {
          return { status: false, message: "your access denied some time wait" }
        }
      } else {
        return { status: false, message: "superlead not found" }
      }
    } catch (error) {
      return { error: 'Internal server error' };
    }
  },
  
  getAllStudentsStatus: async (uniqueId: string, currentPage: number) => {
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
      const response = await schema.Students.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' } // Using a regex to match the prefix case-insensitively
          }
        },
        // Pagination: Skip and limit the number of documents returned
      ]);
  
      if (response && response.length > 0) {
        return { response }
      } else {
        return { message: "students not found your hub" }
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal server error' }
    }
  },

  updateStudentStatus: async (studentId: string, action: string) => {
    console.log("Incoming backend action", studentId, action);

    try {
      if (!studentId) {
        return { status: false, message: "Student not found" };
      }

      const student: any = await schema.Students.updateOne({ studentId: studentId }, { $set: { isStatus: action } }, { new: true });

      if (!student) {
        return { status: false, message: "Student not found" };
      }
      // Return success message or other appropriate response
      return { status: true, message: "Student status updated successfully" };
    } catch (error) {
      // Handle errors
      console.error("Error in updating student status:", error);
      return { status: false, message: "An error occurred while updating student status" };
    }
  },
  getHubwiseStudentsDetails: async (uniqueId: string) => {
    try {
      if (!uniqueId) {
        return { status: false, message: "Student not found Your Hub" };
      }
      const indexM = uniqueId.indexOf('M');
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;
      const response = await schema.Students.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' } // Using a regex to match the prefix case-insensitively
          }
        }
      ]);
      if (response && response.length > 0) {
        return { response }
      } else {
        return { message: "students not found your hub" }
      }
    } catch (error) {
      return { status: false, message: "An error occurred while get hubwise students details" };
    }
  },
  getAllReviewers: async () => {
    try {
      const response = await schema.Reviewers.find({})
      if (response && response.length > 0) {
        return response;
      } else {
        return { status: false, message: "reviewers not found" }
      }
    } catch (error) {
      return { status: false, message: "Internal Server Error" }
    }
  },
  createReviewersUniqueId: async () => {
    try {
      const response = await schema.Reviewers.find().sort({ _id: -1 }).limit(1).exec()
      return response;
    } catch (err) {
      console.log(err);
    }

  },
  reviewerEmailExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Reviewers.find({ $or: [{ email }, { phone }] });
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating Reviewer" }
    }
  },
  reviewerUniqueIdExist: async (uniqueId: String) => {
    try {
      const response = await schema.Reviewers.find({ uniqueId: uniqueId })
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating Reviewer" }
    }

  },
  createReviewers: async (data: any, uniqueId: string) => {
    try {
      const reviewerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        uniqueId: uniqueId,
      };
      const response = await schema.Reviewers.create(reviewerData);
      return { status: true, message: "Reviewer created successfully" };
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating Reviewer" }
    }
  },
  updateReviewerStatus: async (reviewerId: string, action: string) => {
    console.log("Incoming backend action", reviewerId, action);

    try {
      if (!reviewerId) {
        return { status: false, message: "reviewer not found" };
      }

      const reviewer: any = await schema.Reviewers.updateOne({ _id: reviewerId }, { $set: { isStatus: action } }, { new: true });
      console.log(reviewer, "ghvghvhh");

      if (!reviewer) {
        return { status: false, message: "reviewer not found" };
      }
      // Return success message or other appropriate response
      return { status: true, message: "reviewer status updated successfully" };
    } catch (error) {
      // Handle errors
      console.error("Error in updating reviewer status:", error);
      return { status: false, message: "An error occurred while updating reviewer status" };
    }
  },
  getSuperleadHubLocation: async (uniqueId: string) => {

    try {
      if (!uniqueId) {
        return { status: false, message: "some issue in the get hub location" }
      }
      const response = await schema.Superleads.findOne({ uniqueId: uniqueId })

      if (!response) {
        return { status: false, message: "superlead not found" }
      } else {
        return { status: true, response }
      }

    } catch (error) {
      return { status: false, message: "Erro an occur while get hub location" }
    }
  },
  updatePlacedStudentStatus: async (studentId: string, action: string, confirm: string, date: string) => {
    try {
      if (!studentId) {
        return { status: false, message: "student not found" }
      }
      if (confirm === "confirm") {
        console.log(action, date, "comg coming inside if casee");

        const student = await schema.Students.updateOne(
          { studentId: studentId }, // Filter criteria
          {
            $set: {
              isStatus: action,
              placedDate: date
            }
          }, // Update operation
          { new: true } // Options object
        );


        if (!student) {
          return { status: false, message: "Student not found" };
        }
        // Return success message or other appropriate response
        return { status: true, message: "Student status updated successfully" };
      } else {
        return { status: false, message: "confirm code not updated,try after some time" }
      }
    } catch (error) {
      return { status: false, message: "Error in the update Placed Students Status" }
    }
  },
  getPlacedStudentsAndCurrentStudents: async (uniqueId: string) => {
    try {
      if (!uniqueId) {
        return { status: false, message: 'Current students and placed students not found in your hub' };
      }

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const indexM = uniqueId.indexOf('M');
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;

      const response = await schema.Students.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' },
            $or: [
              { isStatus: 'Active', createdDate: { $regex: `${currentYear}` } },
              { isStatus: 'Placed', placedDate: { $regex: `${currentYear}-` } }
            ]
          }
        },

      ]);
   if(response && response.length > 0){
     return {response}
   }else{
    return { satus:false, message:"current year no study students and placed students"};
   }

    } catch (error) {
      return { status: false, message: "Error in getting placed students and current students" };
    }
  },

  createAdvisorsUniqueId :async () =>{
     try {
      const response = await schema.Advisors.find().sort({ _id: -1 }).limit(1).exec()
      return response;
     } catch (error) {
       return {status:false,message:"Error in the craete advisors uniqueId"}
     }
  },
  advisorEmailExist : async (email:string,phone:string) =>{
    try {
      const response = await schema.Advisors.find({ $or: [{ email }, { phone }] });
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating Advisor" }
    }
  },
  advisorUniqueIdExist : async (uniqueId:string) =>{
    try {
      const response = await schema.Advisors.find({ uniqueId: uniqueId })
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating advisor" }
    }

  },
  createAdvisors : async (data:any,uniqueId:string) =>{
    try {
      const advisorData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        uniqueId: uniqueId,
      };
      const response = await schema.Advisors.create(advisorData);
      return { status: true, message: "advisor created successfully" };
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating advisor" }
    }
  }

}
