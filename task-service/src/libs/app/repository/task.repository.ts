import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
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
}

  
  
}