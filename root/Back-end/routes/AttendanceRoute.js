const express =require('express')
const router=express.Router()
const attendance=require('../models/attendance')

router.post('/', async (req, res) => {
    try {
        const attendanceData = req.body;
        const updatedData = [];

        for (const record of attendanceData) {
            if (!record.regno) {
                return res.status(400).json({ message: 'regno is required for each record' });
            }

            const updateData = await attendance.findOneAndUpdate(
                { regno: record.regno },
                { $set: record },
                { new: true, upsert: true }
            );

            updatedData.push(updateData);
        }

        res.status(200).json(updatedData);
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(400).json({ message: 'Error saving attendance', error });
    }
  });   
  
router.get('/',async(req,res)=>{
    try{
        const data=await attendance.find();
        res.status(200).json(data);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get('/percentage', async (req, res) => {
    try {
        const { className, regno, subject } = req.query;

        if (!className || !regno || !subject) {
            return res.status(400).json({ message: 'className, regno, and subject are required' });
        }

        const totalClasses = await attendance.countDocuments({ className, regno, subject });

        if (totalClasses === 0) {
            return res.status(404).json({ message: 'No attendance records found for this student' });
        }

        const presentCount = await attendance.countDocuments({ className, regno, subject, present: true });

        const attendancePercentage = (presentCount / totalClasses) * 100;

        res.status(200).json({
            regno,
            className,
            subject,
            totalClasses,
            presentCount,
            attendancePercentage: attendancePercentage.toFixed(2) 
        });
    } catch (error) {
        console.error('Error calculating attendance percentage:', error);
        res.status(500).json({ message: 'Error calculating attendance percentage', error });
    }
});

module.exports=router