import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import mongoose from "mongoose";
import { response } from "express";
import { authenticationProducer } from "../../../events/authenticationProducer";
import { ObjectId } from "mongodb";
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
    console.log(data, "++++++6666666999999999999");
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
      const indexM = uniqueId.indexOf('M');
      const uniqueLetters = indexM !== -1 ? uniqueId.substring(0, indexM) : uniqueId;

      const pageSize = 5;
      const skip = (currentPage - 1) * pageSize;

      const response = await schema.Students.aggregate([
        {
          $match: {
            batch: { $regex: `^${uniqueLetters}`, $options: 'i' }
          }
        },
        { $skip: skip },
        { $limit: pageSize }
      ]);

      if (response && response.length > 0) {
        return { response };
      } else {
        return { message: "students not found your hub" };
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal server error' };
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
      if (response && response.length > 0) {
        return { response }
      } else {
        return { satus: false, message: "current year no study students and placed students" };
      }

    } catch (error) {
      return { status: false, message: "Error in getting placed students and current students" };
    }
  },

  createAdvisorsUniqueId: async () => {
    try {
      const response = await schema.Advisors.find().sort({ _id: -1 }).limit(1).exec()
      return response;
    } catch (error) {
      return { status: false, message: "Error in the craete advisors uniqueId" }
    }
  },
  advisorEmailExist: async (email: string, phone: string) => {
    try {
      const response = await schema.Advisors.find({ $or: [{ email }, { phone }] });
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating Advisor" }
    }
  },
  advisorUniqueIdExist: async (uniqueId: string) => {
    try {
      const response = await schema.Advisors.find({ uniqueId: uniqueId })
      return response;
    } catch (err) {
      return { status: false, message: "An Error occur whilte creating advisor" }
    }

  },
  createAdvisors: async (data: any, uniqueId: string) => {
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
  },
  checkStudentActive: async (studentId: string) => {
    try {
      if (!studentId) {
        return { status: false, message: "student not found" }
      }
      const response = await schema.Students.find({ studentId: studentId })
      console.log(response, "student active or not check");

      if (response) {
        return { status: false, message: "student not found" }
      } else {
        // if(response.isStatus==="Active"){

        // }
      }
    } catch (error) {
      return { status: false, message: "Error in the check student active or not" }
    }
  },
  getReviewAdvisors: async () => {
    try {
      const response = await schema.Advisors.find({}, "_id")
      const cleanResponse = response.map((adv) => {
        return { _id: adv._id.toHexString() }
      }

      )
      console.log(cleanResponse, "llllllll");
      if (cleanResponse.length > 0) {
 
          const response = await authenticationProducer(cleanResponse, 'coordinator-data', 'reviewAdvisors');

      
      }

    } catch (error) {
      return { status: false, message: "Error getting from get review advisors" }
    }
  },

  advisorLogin: async (uniqueId: string) => {
    try {

      const advisor = await schema.Advisors.findOne({ uniqueId });

      if (advisor) {
        console.log(advisor);

        const advisors = {
          _id: advisor._id.toString(),
          name: advisor.firstName?.toString(),
          email: advisor.email?.toString()
        };

        const accessToken = await jwt.sign(advisors, config.secretKey, { expiresIn: '1d' });
        if (accessToken) {
          const uid = advisors._id.toString();
          const customToken = await admin.auth().createCustomToken(uid);
          if (customToken) {
            return { advisor, accessToken, customToken };
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
  getStdDashboardDetais: async (studentId: string) => {
    try {
      if (!studentId) {
        return { status: false, message: "student not found" }
      }
      const response = await schema.Students.find({ studentId: studentId })
      if (!response) {
        return { status: false, message: "student not found" }
      } else {
        return { status: true, response }
      }
    } catch (error) {
      return { status: false, message: "Error getting from get student details" }
    }
  },
  getReviewStudents: async () => {
    console.log("get review studentss repository 888*****");

    try {
      // Aggregate to get last week's data for each student
      const reviewStudents: any = []
      const reviewStudent = await schema.Students.aggregate([
        {
          '$match': {
            '$and': [
              {
                'lastWeekReviewStatus': true
              }, {
                'isRepeat': false
              }
            ]
          }
        }
      ])
      console.log(reviewStudent, "revewStudnetsssssssssss1111111");

      const studentData = reviewStudent.map((student: any, index: number) => {
        return { _id: student.studentId }
      })
      if (studentData.length > 0) {
        console.log(studentData, "llllllllll999676665");
        const response = await authenticationProducer(studentData, 'student-data', 'reviewStudents');
      }
      //  const updateReviewStatus = await schema.Students.updateMany({},{$set:{lastWeekReviewStatus:true}})
    } catch (error: any) {
      return { status: false, message: "Error getting review students: " + error.message };
    }
  },
  getAdvisorDetails: async (advisorId: string) => {
    try {
      if (!advisorId) {
        return { status: false, message: "advisor not found" }
      }
      console.log(advisorId, "advisorid aget dorm ");

      const response = await schema.Advisors.find({ _id: advisorId })
      console.log(response, "ressposeeee in get advisor detailssss");

      if (!response) {
        return { status: false, message: "advisor not found" }
      } else {
        return { status: true, response }
      }
    } catch (error) {
      return { status: false, message: "Error getting from get advisor details" }
    }
  },
  getAllAdvisors: async () => {
    try {
      const response = await schema.Advisors.find({})
      if (response.length > 0) {
        return { status: true, response }
      } else {
        return { status: false, message: "No Advisors Your Institution" }
      }
    } catch (error) {
      return { status: false, message: "Error grtting from get all advisors" }
    }
  },
  updateAdvisorStatus: async (advisorId: string, action: string) => {
    try {
      if (!advisorId || !action) {
        return { status: false, message: "advisor not found" }
      }
      const advisor: any = await schema.Advisors.updateOne({ _id: advisorId }, { $set: { isStatus: action } }, { new: true });
      if (!advisor) {
        return { status: false, message: "advisor not found" };
      }
      // Return success message or other appropriate response
      return { status: true, message: "advisor status updated successfully" };
    } catch (error) {
      return { status: false, message: "Error getting from update advisor status" }
    }
  },
  getReviewInitiators: async (advisorId: string, reviewerId: string, studentId: string) => {
    try {
      if (!advisorId || !reviewerId || !studentId) {
        return { status: false, message: "get review initiators details not found" }
      }
      console.log(reviewerId, "lll");

      const advisor = await schema.Advisors.findOne({ _id: advisorId })
      const reviewer = await schema.Reviewers.findOne({ _id: reviewerId });

      const student = await schema.Students.findOne({ studentId: studentId })
      console.log(advisor, "advisor advisor advisor advisor");
      console.log(reviewer, "reviewer reviewer reviewer reviewer");
      console.log(student, "student student student student");
      if (!advisor || !reviewer || !student) {
        return { status: false, message: "get review initiators details not found" }
      } else {
        const data = {
          advisorName: `${advisor.firstName} ${advisor.lastName}`,
          reviewerName: `${reviewer.firstName} ${reviewer.lastName}`,
          currentWeek: student.currentWeek,
          batchId: student.batchId,
        }
        return { status: true, data }
      }
    } catch (error) {
      return { status: false, message: "Error getting from get review initiators detaisl" }
    }
  },
  updateReviewStatus: async (studentId: string, currentWeek: string, status: boolean) => {
    try {
      if (!studentId || !currentWeek) {
        return { status: false, message: "Not update review status" };
      }

      if (status===true) {
        const response = await schema.Students.updateOne(
          { studentId: studentId }, // Filter criteria
          {
            $set: {
              currentWeek: currentWeek,
              lastWeekReviewStatus: true,
              isRepeat: false
            }
          } // Update operation
        );
        if (response) {
          return { status: true, message: "Review status updated successfully" };
        } else {
          return { status: false, message: "Failed to update review status" };
        }
      }else{
        const response = await schema.Students.updateOne(
          { studentId: studentId }, // Filter criteria
          {
            $set: {
              lastWeekReviewStatus: false,
              isRepeat: true
            }
          } // Update operation
        );
        if (response) {
          return { status: true, message: "Review status updated successfully" };
        } else {
          return { status: false, message: "Failed to update review status" };
        }
      }


    } catch (error) {
      return { status: false, message: "Error updating review status" };
    }
  },

  updateManifestDetails: async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "manifest details not updated" }
      }
      const response = await schema.Students.updateOne(
        { studentId: data.studentId }, // Filter criteria
        {
          $set: {
            domain: data.domain,
            profileUrl: data.imageUrl
          }
        }, // Update operation
        { new: true } // Options object
      );
      if (response) {
        return { status: true, message: "update manifest details successfully" }
      }
    } catch (error) {
      return { status: false, messsage: "Error grtting update manifest data to auth" }
    }
  },
  getStudentProfile: async (studentId: string) => {
    try {
      if (!studentId) {
        return { status: false, message: "student not found" }
      }
      const response = await schema.Students.findOne({ studentId })
      if (response) {
        return { status: true, response }
      } else {
        return { status: false, messaeg: "student not found" }
      }
    } catch (error) {
      return { status: false, message: "Error gettin from get student profile" }
    }
  },
  advisorTasks: async (data: any) => {
    try {
        if (!data || !Array.isArray(data) || data.length === 0) {

            return { status: false, message: "Advisor task not updated from student" };
        }
        
        for (const task of data) {
            const advisor = await schema.Advisors.findById(task.coordinatorId);
            if (!advisor) {
                return { status: false, message: "Advisor not found" };
            }

            const weeklyTaskCount = task.studentList.length + advisor.weeklyTask;
            advisor.weeklyTask = weeklyTaskCount;
            advisor.weeklyTaskList = advisor.weeklyTaskList.concat(task.studentList);
            await advisor.save();
        }
        
        return { status: true, message: "Advisor tasks updated successfully" };
    } catch (error:any) {
        return { status: false, message: "Error updating advisor tasks: " + error.message };
    }
}

}
