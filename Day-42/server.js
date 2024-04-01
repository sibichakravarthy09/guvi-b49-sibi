const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// Importing the models
const Mentor = require("./models/Mentor");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

app.use(bodyParser.json());

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes

// Create Mentor
app.post("/mentor", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create Student
app.post("/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign multiple students to a mentor
app.post("/mentor/:mentorId/assign", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    const students = await Student.find({ _id: { $in: req.body.students } });

    students.forEach(async (student) => {
      student.cMentor = mentor._id;
      await student.save();
    });

    mentor.students.push(...students.map((student) => student._id));
    await mentor.save();

    res.send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign a mentor to a student
app.put("/student/:studentId/assignMentor/:mentorId", async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const student = await Student.findById(studentId);
    const newMentor = await Mentor.findById(mentorId);

    if (!student || !newMentor) {
      return res.status(404).json({ error: "Student or Mentor not found" });
    }

    if (student.cMentor && student.cMentor.toString() === mentorId) {
      return res.status(400).json({ error: "Student is already assigned to this mentor" });
    }

    if (student.cMentor) {
      student.pMentor.push(student.cMentor);
      const previousMentor = await Mentor.findById(student.cMentor);
      if (previousMentor) {
        previousMentor.students.pull(student._id);
        await previousMentor.save();
      }
    }

    student.cMentor = newMentor._id;
    newMentor.students.push(student._id);

    await student.save();
    await newMentor.save();

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Show all students for a particular mentor
app.get("/mentor/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate("students");
    res.send(mentor.students);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Show the previously assigned mentor for a particular student
app.get("/student/:studentId/pMentor", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("pMentor");
    if (!student) {
      return res.status(404).json({ error: "No previous Mentor Available" });
    } else {
      res.send(student.pMentor);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
