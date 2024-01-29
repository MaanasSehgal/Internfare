const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const User = require("./models/User");
const Course = require("./models/course");
const subtopic = require("./models/subtopic");
const Topic = require("./models/topic");
const Assignment = require("./models/assignment");
const Option = require("./models/option");

main()
    .then(() => {
        console.log("Successfully connected with DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", async (req, res) => {
    res.send("Hello Server");
});

app.get("/newuser", async (req, res) => {
    const newUser = new User({
        firstName: "Adarsh",
        lastName: "Kumar",
        dob: Date.now(),
        email: "Adarsh.Kumar@gmail.com",
        password: "Hello I am topper",
    });
    await newUser.save();
    console.log(newUser);
});

app.get("/allusers", async (req, res) => {
    const allUsers = await User.find({});
    res.send(allUsers);
});

app.get("/newcourse", async (req, res) => {
    const newCourse = new Course({
        courseName: "Web Dev",
        description: "html css js and more..",
    });
    await newCourse.save();
    console.log(newCourse);
});

app.get("/newsubtopic", async (req, res) => {
    const newSubtopic = new subtopic({
        subtopicName: "Async Await",
        info: [
            {
                description: "return promise",
                videos: ["abc", "xyz"],
            },
        ],
    });
    await newSubtopic.save();
    console.log(newSubtopic);
});

app.get("/newtopic", async (req, res) => {
    const newTopic = new Topic({
        topicName: "CSS",
        subTopics: [
            {
                subTopicId: "65b7c6ad763be89c85041400",
            },
        ],
    });
    await newTopic.save();
    console.log(newTopic);
});

app.get("/gettopicname", async (req, res) => {
    // const subtopicId = req.body.subtopicId;
    // console.log(subtopicId);
    // const topics = await Topic.find({});
    // console.log(topics[0].subTopics[0].subTopicId);
    const topic = await Topic.findOne({"subTopics.subTopicId": new mongoose.Types.ObjectId("65b7c6ad763be89c85041400")});
    console.log(topic);
});

app.get("/newassignment", async (req, res) => {
    try {
        // Create new options
        const newOptions = new Option({
            answer: [
                {
                    correct: false,
                    name: "hello",
                },
                {
                    correct: true,
                    name: "hello2",
                },
                {
                    correct: false,
                    name: "hello3",
                },
                {
                    correct: false,
                    name: "hello4",
                },
            ],
        });

        await newOptions.save();
        console.log(newOptions);

        // Create a new assignment with questions referencing the created options
        const newAssignment = await Assignment.create({
            courseId: "65b7d143edc58a30eae6346f",
            questions: [
                {
                    question: "Which hello is correct?",
                    options: newOptions._id,
                },
            ],
        });

        await newAssignment.save();
        console.log(newAssignment);

        res.status(201).json({message: "Assignment created successfully"});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

app.get("/getassignment", async (req, res) => {
    const assignment = await Assignment.find({_id: "65b7d58eaf5b17d89a4cdc6d"})
        .populate({
            path: "questions",
            populate: {
                path: "options",
                model: "Option",
            },
        })
        .exec();
    console.log(assignment);
    res.send(assignment);
});

// 65b7d143edc58a30eae6346f
app.listen(PORT, () => {
    console.log("Server is listening to port 8080");
});
