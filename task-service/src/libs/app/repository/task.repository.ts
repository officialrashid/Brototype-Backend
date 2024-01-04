import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import { response } from "express";
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
updateMiscellaneousWorkout : async (data:any)=>{
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
getUpdateTask : async (studentId:string)=>{

    try {
         const response = await schema.WeeklyTaskUpdation.find({studentId:studentId})
          return {status:true,response};
    } catch (error) {
       return {status:false,message:"updated task not found"} 
    }
}
  
}