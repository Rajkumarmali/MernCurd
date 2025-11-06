const express = require("express");
const RequireLogin = require("../middleware/RequireLogin");
const Student = require("../models/studen");
const router = express.Router();

router.post("/addStudent", RequireLogin, async (req, res) => {
    const { name, email, phone, address } = req.body;
    const newStudent = new Student({
        name: name,
        email: email,
        phone: phone,
        address: address,
        userId: req.userId
    })
    await newStudent.save();
    res.send("student added successfully");
})

router.post('/updateStudent/:id', RequireLogin, async (req, res) => {
    const studentId = req.params.id;
    const { name, email, phone, address } = req.body;
    const updateStudent = await Student.findByIdAndUpdate(studentId, {
        name: name,
        email: email,
        phone: phone,
        address: address
    },
        { new: true })
    res.send(updateStudent)
})

router.get('/getStudent', RequireLogin, async (req, res) => {
    const students = await Student.find({ userId: req.userId });
    res.send(students);
})

router.post('/deleteStudent/:id', RequireLogin, async (req, res) => {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.send("student deleted successfully");
})


module.exports = router;

