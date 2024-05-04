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


    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }
      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        const personalWorkoutArray = existingStudent.personalWorkouts;

        if (personalWorkoutArray.length > 0) {
          const existingTaskIndex = personalWorkoutArray.findIndex(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );


          if (existingTaskIndex !== -1) {
            const existingTask = personalWorkoutArray[existingTaskIndex];


            // Task exists, update it
            try {
              existingTask.questionNumbersAndAnswers.forEach((qna, index) => {
                data.personalWorkouts.map((item: any, index: number) => {


                  if (qna.nestedQuestionNumber === item.nestedQuestionNumber) {

                    qna.nestedQuestionNumber = item.nestedQuestionNumber
                    qna.answer = item.answer

                  }
                })

              });

              const updatedStudent = await existingStudent.save();



              return { status: true, message: "Personal workout successfully updated", updatedStudent };

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


          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {

          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {

      return { status: false, message: "Personal workout update issue found" };
    }
  },
  updateTechnicalWorkout: async (data: any) => {


    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }



      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        const technicalWorkoutArray = existingStudent.technicalWorkouts;

        if (technicalWorkoutArray.length > 0) {
          const existingTaskIndex = technicalWorkoutArray.findIndex(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );


          if (existingTaskIndex !== -1) {
            const existingTask = technicalWorkoutArray[existingTaskIndex];


            // Task exists, update it
            try {
              existingTask.questionNumbersAndAnswers.forEach((qna, index) => {
                data.technicalWorkouts.map((item: any, index: number) => {


                  if (qna.nestedQuestionNumber === item.nestedQuestionNumber) {

                    qna.nestedQuestionNumber = item.nestedQuestionNumber
                    qna.answer = item.answer

                  }
                })

              });

              const updatedStudent = await existingStudent.save();



              return { status: true, message: "Personal workout successfully updated", updatedStudent };
            } catch (error) {

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


          if (!response) {
            return { status: false, message: "No changes made to the student record" };

          } else {
            return { status: true, message: "Personal workout successfully updated", response };
          }
        } catch (error) {

          return { status: false, message: "Personal workout update issue found" };
        }
      } else {


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


          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {

          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {

      return { status: false, message: "Personal workout update issue found" };
    }
  },
  updateMiscellaneousWorkout: async (data: any) => {


    try {
      if (!data) {
        return { status: false, message: "Personal workout data not found" };
      }



      const existingStudent = await schema.WeeklyTaskUpdation.findOne({ studentId: data.studentId });

      if (existingStudent) {
        const miscellaneousWorkoutArray = existingStudent.miscellaneousWorkouts;

        if (miscellaneousWorkoutArray.length > 0) {
          const existingTaskIndex = miscellaneousWorkoutArray.findIndex(
            (task) => task.week === data.weekName && task.mainQuestionNumber === data.mainQuestionNumber
          );


          if (existingTaskIndex !== -1) {
            const existingTask = miscellaneousWorkoutArray[existingTaskIndex];


            // Task exists, update it
            try {
              existingTask.questionNumbersAndAnswers.forEach((qna, index) => {
                data.miscellaneousWorkouts.map((item: any, index: number) => {


                  if (qna.nestedQuestionNumber === item.nestedQuestionNumber) {

                    qna.nestedQuestionNumber = item.nestedQuestionNumber
                    qna.answer = item.answer

                  }
                })

              });

              const updatedStudent = await existingStudent.save();




              if (!response) {
                return { status: false, message: "No changes made to the student record" };
              } else {
                return { status: true, message: "Personal workout successfully updated", response };
              }
            } catch (error) {

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


          if (!response) {
            return { status: false, message: "No changes made to the student record" };

          } else {
            return { status: true, message: "Personal workout successfully updated", response };
          }
        } catch (error) {

          return { status: false, message: "Personal workout update issue found" };
        }
      } else {


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


          if (response) {
            return { status: true, message: "Personal workout successfully created", response };
          } else {
            return { status: false, message: "Update task issue found" };
          }
        } catch (error) {

          return { status: false, message: "Personal workout creation issue found" };
        }
      }
    } catch (error) {

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


    try {
    
      // // Set the dynamic field based on the taskType
      const response: any = await schema.WeeklyTaskUpdation.find({ studentId: studentId });
      console.log(response, "Response");
      
      if (response && response.length > 0) {
        const tskType = response[0][`${taskType}Workouts`];
        console.log(tskType, "Workouts for Task Type");
      
        if (tskType) {
          // Filter based on week and mainQuestionNumber
          const filteredWorkouts = tskType.filter((workout: { week: any; mainQuestionNumber: number; }) => workout.week === weekName && workout.mainQuestionNumber === parseInt(mainQuestionNumber, 10));
      
          if (filteredWorkouts.length > 0) {
            // Extract questionNumbersAndAnswers
            const questionNumbersAndAnswers = filteredWorkouts.map((workout: { questionNumbersAndAnswers: any; }) => workout.questionNumbersAndAnswers);
      
            console.log(questionNumbersAndAnswers, "Question Numbers And Answers");
      
            return { status: true, message: "Data fetched successfully", data: questionNumbersAndAnswers };
          } else {
            return { status: false, message: "No matching data found for the specified week and mainQuestionNumber" };
          }
        } else {
          return { status: false, message: "No matching data found for the specified task type" };
        }
      } else {
        return { status: false, message: "No data found for the specified student ID" };
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
          return { status: true, message: "Technical Task Updated Successfully" }
        } else {
          // If 'week1' doesn't exist, create a new task
          await schema.TechnicalWorkouts.create(data);
          return { status: true, message: "Technical Task Created Successfully" }
        }
      } else {
        // If 'flutter' domain doesn't exist, push 'week1' as a new task
        await schema.TechnicalWorkouts.create(data);
        return { status: true, message: "Technical Task Created Successfully" }
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


      const response = await schema.TechnicalWorkouts.find(query);

console.log(response,"responseee in technical workoutsssssss");

      if (!response || response.length === 0) {
        return { status: false, message: 'No documents found for the specified domain and week' };
      } else {
        return { status: true, response };
      }
    } catch (error) {
      // Handle the error, e.g., log it or return an error response

      return { status: false, message: 'An error occurred' };
    }
  },
  getWeekTask: async (studentId: string, weekName: string , domain:string) => {
    try {
      if (!studentId || !weekName) {
        return { status: false, message: "Student ID or week name not provided" };
      }
  
      const response = await schema.WeeklyTaskUpdation.findOne({ studentId: studentId });
  
      if (!response) {
        return { status: false, message: "No data found for the specified student ID" };
      }
      const personalWorkoutQuestions = await schema.PersonalWorkouts.find({week:weekName})
      const technicalWorkoutQuestions = await schema.TechnicalWorkouts.find({week:weekName,domain:domain})
      const miscellaneousWorkouts = await schema.MiscellaneousWorkouts.find({week:weekName})
      // Filter the arrays based on the matching week
      if(personalWorkoutQuestions && technicalWorkoutQuestions && miscellaneousWorkouts){
        const filteredTasks = response.toJSON(); // Convert Mongoose document to plain JavaScript object
  
        const weekTasks = {
          personalWorkouts: filteredTasks.personalWorkouts.filter(workout => workout.week === weekName),
          technicalWorkouts: filteredTasks.technicalWorkouts.filter(workout => workout.week === weekName),
          miscellaneousWorkouts: filteredTasks.miscellaneousWorkouts.filter(workout => workout.week === weekName)
        };
    
        if (Object.values(weekTasks).some(array => array.length > 0)) {
          console.log(weekTasks, "Week tasks fetched successfully");
          return { status: true, message: "Week tasks fetched successfully", data: weekTasks,personalWorkoutQuestions,technicalWorkoutQuestions,miscellaneousWorkouts };
        } else {
          return { status: false, message: "No tasks found for the specified student and week" };
        }
      }else{
        return {status:false,message:"student updated task question not found"}
      }
  
    } catch (error) {
      console.error("Error fetching week tasks:", error);
      return { status: false, message: "Some error occurred while fetching week tasks" };
    }
  }
  
  






}
