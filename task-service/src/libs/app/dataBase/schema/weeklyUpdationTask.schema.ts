import mongoose from "mongoose";

const weeklyTaskUpdationSchema = new mongoose.Schema({
    studentId: String,
    batchId: String,
  
    personalWorkouts: [
        {
            week: String,
            mainQuestionNumber: Number,
            questionNumbersAndAnswers: [
                {
                    nestedQuestionNumber: String,
                    answer: String,
                }
            ]
        }
    ],
    technicalWorkouts: [{
        week: String,
        mainQuestionNumber: Number,
        questionNumbersAndAnswers: [
            {
                nestedQuestionNumber: String,
                answer: String,
            }
        ]
    }],
    miscellaneousWorkouts: [{
        week: String,
        mainQuestionNumber: Number,
        questionNumbersAndAnswers: [
            {
                nestedQuestionNumber: String,
                answer: String,
            }
        ]
    }],
});

const WeeklyTaskUpdation = mongoose.model("WeeklyTaskUpdation", weeklyTaskUpdationSchema);

export {
    WeeklyTaskUpdation,
};
