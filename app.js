const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const User = require("./models/User");

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

// app.get("/newuser", async (req, res) => {
//     const newUser = new User({
//         firstName: "Maanas",
//         lastName: "Sehgal",
//         dob: Date().toLocaleString("en-IN", {dateStyle: "short"}).split("/").reverse().join("-"),
//         email: "maanas.sehgal@gmail.com",
//         password: "Hello World",
//     });
//     await newUser.save();
//     console.log(newUser);
// });

app.get("/allusers", async (req, res) => {
    const allUsers = await User.find({});
    res.send(allUsers);
});

app.listen(PORT, () => {
    console.log("Server is listening to port 8080");
});
