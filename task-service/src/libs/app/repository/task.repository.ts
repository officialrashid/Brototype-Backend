import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import { response } from "express";
import mongoose from "mongoose";
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

export default {

  updatePersonalWorkout: async (data: any) => {
    console.log(data, "opppesss");

    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }

      console.log(data.studentId, "First log");
      console.log(data.personalWorkouts, "Second log");

      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        const personalWorkoutArray = existingStudent.personalWorkouts;

        if (personalWorkoutArray.length > 0) {
          const existingTask = personalWorkoutArray.find(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );

          if (existingTask) {
            // Task exists, update it
            try {
              const response = await schema.WeeklyTaskUpdation.updateOne(
                {
                  studentId: data.studentId,
                  "personalWorkouts.week": data.weekName,
                  "personalWorkouts.mainQuestionNumber": data.mainQuestionNumber,
                },
                {
                  $set: {
                    "personalWorkouts.$.questionNumbersAndAnswers": data.personalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                      nestedQuestionNumber: item.nestedQuestionNumber,
                      answer: item.answer,
                    })),
                  },
                }
              );

              console.log(response, "Response updated");

              if (!response) {
                return { status: false, message: "No changes made to the student record" };
              } else {
                return { status: true, message: "Personal workout successfully updated", response };
              }
            } catch (error) {
              console.error("Error updating personal workout:", error);
              return { status: false, message: "Personal workout update issue found" };
            }
          }
        }


        console.log("Student already exists:", existingStudent);

        try {
          const updateFields = {
            $push: {
              "personalWorkouts": {
                week: data.weekName,
                mainQuestionNumber: data.mainQuestionNumber,
                questionNumbersAndAnswers: data.personalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                  nestedQuestionNumber: item.nestedQuestionNumber,
                  answer: item.answer,
                })),
              },
            },
          };

          const response = await schema.WeeklyTaskUpdation.updateOne({ studentId: data.studentId }, updateFields);
          console.log(response, "Response updated");

          if (!response) {
            return { status: false, message: "No changes made to the student record" };
          } else {
            return { status: true, message: "Personal workout successfully updated", response };
          }
        } catch (error) {
          console.error("Error updating personal workout:", error);
          return { status: false, message: "Personal workout update issue found" };
        }
      } else {
        console.log("Student not found, creating a new entry");

        const personalWorkout = {
          studentId: data.studentId,
          batchId: data.batchId,
          personalWorkouts: [
            {
              week: data.weekName,
              mainQuestionNumber: data.mainQuestionNumber,
              questionNumbersAndAnswers: data.personalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                nestedQuestionNumber: item.nestedQuestionNumber,
                answer: item.answer,
              })),
            },
          ],
        };

        try {
          const response = await schema.WeeklyTaskUpdation.create(personalWorkout);
          console.log(response, "Response created");

          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {
          console.error("Error creating personal workout:", error);
          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {
      console.error("Error updating personal workout:", error);
      return { status: false, message: "Personal workout update issue found" };
    }
  },
  updateTechnicalWorkout: async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }

      console.log(data.studentId, "First log");
      console.log(data.technicalWorkouts, "Second log");

      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        console.log("Student already exists:", existingStudent);
        const technicalWorkoutArray = existingStudent.technicalWorkouts;

        if (technicalWorkoutArray.length > 0) {
          const existingTask = technicalWorkoutArray.find(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );

          if (existingTask) {
            // Task exists, update it
            try {
              const response = await schema.WeeklyTaskUpdation.updateOne(
                {
                  studentId: data.studentId,
                  "technicalWorkouts.week": data.weekName,
                  "technicalWorkouts.mainQuestionNumber": data.mainQuestionNumber,
                },
                {
                  $set: {
                    "technicalWorkouts.$.questionNumbersAndAnswers": data.technicalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                      nestedQuestionNumber: item.nestedQuestionNumber,
                      answer: item.answer,
                    })),
                  },
                }
              );

              console.log(response, "Response updated");

              if (!response) {
                return { status: false, message: "No changes made to the student record" };
              } else {
                return { status: true, message: "Personal workout successfully updated", response };
              }
            } catch (error) {
              console.error("Error updating personal workout:", error);
              return { status: false, message: "Personal workout update issue found" };
            }
          }
        }
        try {
          const updateFields = {
            $push: {
              "technicalWorkouts": {
                week: data.weekName,
                mainQuestionNumber: data.mainQuestionNumber,
                questionNumbersAndAnswers: data.technicalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                  nestedQuestionNumber: item.nestedQuestionNumber,
                  answer: item.answer,
                })),
              },
            },
          };

          const response = await schema.WeeklyTaskUpdation.updateOne({ studentId: data.studentId }, updateFields);
          console.log(response, "Response updated");

          if (!response) {
            return { status: false, message: "No changes made to the student record" };

          } else {
            return { status: true, message: "Personal workout successfully updated", response };
          }
        } catch (error) {
          console.error("Error updating personal workout:", error);
          return { status: false, message: "Personal workout update issue found" };
        }
      } else {
        console.log("Student not found, creating a new entry");

        const technicalWorkouts = {
          studentId: data.studentId,
          batchId: data.batchId,
          personalWorkouts: [
            {
              week: data.weekName,
              mainQuestionNumber: data.mainQuestionNumber,
              questionNumbersAndAnswers: data.personalWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                nestedQuestionNumber: item.nestedQuestionNumber,
                answer: item.answer,
              })),
            },
          ],
        };

        try {
          const response = await schema.WeeklyTaskUpdation.create(technicalWorkouts);
          console.log(response, "Response created");

          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {
          console.error("Error creating personal workout:", error);
          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {
      console.error("Error updating personal workout:", error);
      return { status: false, message: "Personal workout update issue found" };
    }
  },
  updateMiscellaneousWorkout: async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }

      console.log(data.studentId, "First log");
      console.log(data.miscellaneousWorkouts, "Second log");

      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        console.log("Student already exists:", existingStudent);
        const miscellaneousWorkoutArray = existingStudent.miscellaneousWorkouts;

        if (miscellaneousWorkoutArray.length > 0) {
          const existingTask = miscellaneousWorkoutArray.find(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );

          if (existingTask) {
            // Task exists, update it
            try {
              const response = await schema.WeeklyTaskUpdation.updateOne(
                {
                  studentId: data.studentId,
                  "miscellaneousWorkouts.week": data.weekName,
                  "miscellaneousWorkouts.mainQuestionNumber": data.mainQuestionNumber,
                },
                {
                  $set: {
                    "miscellaneousWorkouts.$.questionNumbersAndAnswers": data.miscellaneousWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                      nestedQuestionNumber: item.nestedQuestionNumber,
                      answer: item.answer,
                    })),
                  },
                }
              );

              console.log(response, "Response updated");

              if (!response) {
                return { status: false, message: "No changes made to the student record" };
              } else {
                return { status: true, message: "Personal workout successfully updated", response };
              }
            } catch (error) {
              console.error("Error updating personal workout:", error);
              return { status: false, message: "Personal workout update issue found" };
            }
          }
        }
        try {
          const updateFields = {
            $push: {
              "miscellaneousWorkouts": {
                week: data.weekName,
                mainQuestionNumber: data.mainQuestionNumber,
                questionNumbersAndAnswers: data.miscellaneousWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                  nestedQuestionNumber: item.nestedQuestionNumber,
                  answer: item.answer,
                })),
              },
            },
          };

          const response = await schema.WeeklyTaskUpdation.updateOne({ studentId: data.studentId }, updateFields);
          console.log(response, "Response updated");

          if (!response) {
            return { status: false, message: "No changes made to the student record" };

          } else {
            return { status: true, message: "Personal workout successfully updated", response };
          }
        } catch (error) {
          console.error("Error updating personal workout:", error);
          return { status: false, message: "Personal workout update issue found" };
        }
      } else {
        console.log("Student not found, creating a new entry");

        const miscellaneousWorkouts = {
          studentId: data.studentId,
          batchId: data.batchId,
          personalWorkouts: [
            {
              week: data.weekName,
              mainQuestionNumber: data.mainQuestionNumber,
              questionNumbersAndAnswers: data.miscellaneousWorkouts.map((item: { nestedQuestionNumber: any; answer: any; }) => ({
                nestedQuestionNumber: item.nestedQuestionNumber,
                answer: item.answer,
              })),
            },
          ],
        };

        try {
          const response = await schema.WeeklyTaskUpdation.create(miscellaneousWorkouts);
          console.log(response, "Response created");

          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {
          console.error("Error creating personal workout:", error);
          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {
      console.error("Error updating personal workout:", error);
      return { status: false, message: "Personal workout update issue found" };
    }
  },
  getUpdateTask: async (studentId: string) => {

    try {
      const response = await schema.WeeklyTaskUpdation.find({ studentId: studentId })
      return { status: true, response };
    } catch (error) {
      return { status: false, message: "updated task not found" }
    }
  },
  getEditTaskDetails: async (data: any) => {


    const { studentId, mainQuestionNumber, taskType, weekName } = data;
    console.log(studentId, mainQuestionNumber, taskType, weekName, "log from data");

    try {
      let query: any = {
        studentId: studentId,
      };

      // Set the dynamic field based on the taskType
      query[`${taskType}Workouts.week`] = weekName;
      query[`${taskType}Workouts.mainQuestionNumber`] = mainQuestionNumber;

      const response = await schema.WeeklyTaskUpdation.find(query, {
        _id: 0,
        [`${taskType}Workouts.$`]: 1, // Project only the matched element from the array
      });

      if (response && response.length > 0) {
        const result = response.map(entry => (entry as any)[`${taskType}Workouts`][0].questionNumbersAndAnswers);

        return { status: true, message: "Data fetched successfully", data: result };
      } else {
        return { status: false, message: "No matching data found" };
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      return { status: false, message: "Some issues in fetching data" };
    }



  },
  addPersonalWorkoutsTask: async (data: any) => {

    try {
      // Check if the 'flutter' domain already exists
      const existingWeek = await schema.PersonalWorkouts.findOne({ week: data.week });

      if (existingWeek) {
        // If domain exists, check if 'week1' already exists
        const existingTask = await schema.PersonalWorkouts.findOne({ week: data.week });

        if (existingTask) {
          // If 'week1' exists, update the existing task
          const updatePersonalWorkoutTask = await schema.PersonalWorkouts.updateOne({ _id: existingTask._id }, { $set: data });
          if (!updatePersonalWorkoutTask) {
            return { status: false, message: "task not found" }
          } else {
            return { status: true, message: "Personal Workout Task Updated Successfully" }
          }

        } else {
          const PersonalWorkout = await schema.PersonalWorkouts.create(data);
          if (!PersonalWorkout) {
            return { status: false, message: "Personal Workout Task not Created" }
          } else {
            return { status: true, message: "Personal Workout Task Create Successfully" }
          }
        }
      } else {
        // If 'flutter' domain doesn't exist, push 'week1' as a new task
        await schema.PersonalWorkouts.create(data);
        return { status: true, message: "Personal Workout Task Create Successfilly" }
      }
    } catch (error) {
      console.error('Error updating/creating task:', error);
    }
  },
  addTechnicalWorkoutsTask: async (data: any) => {

    try {
      // Check if the  domain already exists
      const existingDomain = await schema.TechnicalWorkouts.findOne({ domain: data.domain });

      if (existingDomain) {
        // If domain exists, check if 'week1' already exists
        const existingTask = await schema.TechnicalWorkouts.findOne({ domain: data.domain, week: data.week });

        if (existingTask) {
          // If 'week1' exists, update the existing task
          await schema.TechnicalWorkouts.updateOne({ _id: existingTask._id }, { $set: data });
          return { status:true,message:"Technical Task Updated Successfully"}
        } else {
          // If 'week1' doesn't exist, create a new task
          await schema.TechnicalWorkouts.create(data);
          return { status:true,message:"Technical Task Created Successfully"}
        }
      } else {
        // If 'flutter' domain doesn't exist, push 'week1' as a new task
        await schema.TechnicalWorkouts.create(data);
        return { status:true,message:"Technical Task Created Successfully"}
      }
    } catch (error) {
      console.error('Error updating/creating task:', error);
    }
  },
  addMiscellaneousWorkoutsTask: async (data: any) => {

    try {
      // Check if the 'flutter' domain already exists
      const existingWeek = await schema.MiscellaneousWorkouts.findOne({ week: data.week });

      if (existingWeek) {
        // If domain exists, check if 'week1' already exists
        const existingTask = await schema.MiscellaneousWorkouts.findOne({ week: data.week });

        if (existingTask) {
          // If 'week1' exists, update the existing task
          const updateMiscellaneousWorkoutTask = await schema.MiscellaneousWorkouts.updateOne({ _id: existingTask._id }, { $set: data });
          if (!updateMiscellaneousWorkoutTask) {
            return { status: false, message: "task not found" }
          } else {
            return { status: true, message: "Miscellaneous Workout Task Updated Successfully" }
          }

        } else {
          const MiscellaneousWorkout = await schema.MiscellaneousWorkouts.create(data);
          if (!MiscellaneousWorkout) {
            return { status: false, message: "Miscellaneous Workout Task not Created" }
          } else {
            return { status: true, message: "Miscellaneous Workout Task Create Successfully" }
          }
        }
      } else {
        // If 'flutter' domain doesn't exist, push 'week1' as a new task
        await schema.MiscellaneousWorkouts.create(data);
        return { status: true, message: "Miscellaneous Workout Task Create Successfilly" }
      }
    } catch (error) {
      console.error('Error updating/creating task:', error);
    }
  },

  getPersonalWorkout: async (week: string) => {
    try {
      const response = await schema.PersonalWorkouts.findOne({ week: week })
      if (!response) {
        return { status: false, message: "week not found" }
      } else {
        return { status: true, response }
      }

    } catch (error) {

    }
  },
  getMiscellaneousWorkout: async (week: string) => {
    try {
      const response = await schema.MiscellaneousWorkouts.findOne({ week: week })
      if (!response) {
        return { status: false, message: "week not found" }
      } else {
        return { status: true, response }
      }

    } catch (error) {

    }
  },
  getTechnicalWorkout: async (domain: string, week: string) => {
    console.log(domain, week, "task get for technicalassss");

    try {
        const query = { domain: domain.trim(), week: week.trim() };  // Trim whitespaces if necessary
        console.log("Query:", query);

        const response = await schema.TechnicalWorkouts.find(query);
        console.log(response, "responseee");

        if (!response || response.length === 0) {
            return { status: false, message: 'No documents found for the specified domain and week' };
        } else {
            return { status: true, response };
        }
    } catch (error) {
        // Handle the error, e.g., log it or return an error response
        console.error("Error in getTechnicalWorkout:", error);
        return { status: false, message: 'An error occurred' };
    }
}





  
}
