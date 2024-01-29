const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: Boolean,
        required: true,
    },
});

const assignmentSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            options: [optionSchema],
        },
    ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
