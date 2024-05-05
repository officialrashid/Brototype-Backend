import mongoose from "mongoose";

const weeklyTaskUpdationSchema = new mongoose.Schema({
    studentId: String,
    batchId: String,
  
    personalWorkouts: [
        {
            week: String,
            mainQuestionNumber: Number,
            mainQuestion : String,
            questionNumbersAndAnswers: [
                {
                    nestedQuestionNumber: String,
                    nestedQuestion: String,
                    answer: String,
                }
            ]
        }
    ],
    technicalWorkouts: [{
        week: String,
        mainQuestionNumber: Number,
        mainQuestion : String,
        questionNumbersAndAnswers: [
            {
                nestedQuestionNumber: String,
                answer: String,
                nestedQuestion: String,
            }
        ]
    }],
    miscellaneousWorkouts: [{
        week: String,
        mainQuestionNumber: Number,
        mainQuestion : String,
        questionNumbersAndAnswers: [
            {
                nestedQuestionNumber: String,
                answer: String,
                nestedQuestion: String,
            }
        ]
    }],
});

const WeeklyTaskUpdation = mongoose.model("WeeklyTaskUpdation", weeklyTaskUpdationSchema);

export {
    WeeklyTaskUpdation,
};
