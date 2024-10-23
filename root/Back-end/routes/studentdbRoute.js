// routes/StudentRoute.js
const express = require('express');
const router = express.Router();
const student = require('../models/studentdb'); // Adjust the path as necessary

// POST route to add a new student
router.post('/', async (req, res) => {
    try {
        const { name, className, regno } = req.body;

        // Check if a student with the same regno exists
        const existingStudent = await student.findOne({ regno });

        if (existingStudent) {
            // If regno exists, check if the className is the same
            if (existingStudent.className === className) {
                return res.status(400).json({ message: 'A student with this registration number is already registered in the same class.' });
            } else {
                // If the className is different, allow insertion of a new student
                const newStudent = new student({
                    name,
                    className,
                    regno,
                });

                const savedStudent = await newStudent.save();
                return res.status(201).json({ message: 'Student saved successfully in a different class', student: savedStudent });
            }
        } else {
            // If no student with this regno exists, insert the new student
            const newStudent = new student({
                name,
                className,
                regno,
            });

            const savedStudent = await newStudent.save();
            return res.status(201).json({ message: 'Student saved successfully', student: savedStudent });
        }
    } catch (error) {
        console.error('Error saving student:', error);
        // Handle the unique constraint error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Registration number must be unique.' });
        }
        res.status(500).json({ message: 'Error saving student', error });
    }
});

router.get('/',async(req,res)=>{
    try{
        const data=await student.find();
        res.status(200).json(data);
    }catch(error){
        res.status(500).send(error);
    }
})


module.exports = router;
