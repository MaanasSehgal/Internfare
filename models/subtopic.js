const mongoose = require("mongoose");

const subtopicSchema = new mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    topicid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
    },
    info: [
        {
            description: {
                type: String,
            },
            videos: [
                {
                    type: String,
                },
            ],
        },
    ],
});

module.exports = mongoose.model("SubTopic", subtopicSchema);
