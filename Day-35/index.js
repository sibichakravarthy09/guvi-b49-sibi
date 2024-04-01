const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 4000;
const URL = process.env.DB;

app.use(express.json());

// Database Connection Function
async function connectDB() {
    try {
        const client = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db("assignment");
    } catch (error) {
        throw new Error("Failed to connect to the database");
    }
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Welcome Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Mentor and Student assigning with database' });
});

// Create Mentor
app.post("/create_mentor", async (req, res) => {
    try {
        const db = await connectDB();
        const mentor = await db.collection("mentors").insertOne(req.body);
        res.json({ message: "Mentor created", id: mentor.insertedId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Create Student
app.post("/create_student", async (req, res) => {
    try {
        const db = await connectDB();
        const student = await db.collection("students").insertOne(req.body);
        res.json({ message: "Student created", id: student.insertedId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Get All Mentors
app.get("/mentors", async (req, res) => {
    try {
        const db = await connectDB();
        const mentors = await db.collection("mentors").find({}).toArray();
        res.json(mentors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Get All Students
app.get("/students", async (req, res) => {
    try {
        const db = await connectDB();
        const students = await db.collection("students").find({}).toArray();
        res.json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Assign Student to a Mentor
app.put("/assign_student/:id", async (req, res) => {
    try {
        const db = await connectDB();
        // Your logic here
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Show all students of a particular mentor
app.get("/mentor_student/:id", async (req, res) => {
    try {
        const db = await connectDB();
        // Your logic here
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Assign or change mentor for student
app.put("/assign_change_mentor/:id", async(req, res) => {
    try {
        const db = await connectDB();
        // Your logic here
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
