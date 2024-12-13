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

          
            const recordDate = record.date ? new Date(record.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);

            const updateData = await attendance.findOneAndUpdate(
                { regno: record.regno, date: recordDate },  
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

  
router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        const query = {};

        if (date) {
            const startDate = new Date(date).setHours(0, 0, 0, 0);
            const endDate = new Date(date).setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lt: endDate };  
        }

        const data = await attendance.find(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
});


router.get('/percentage', async (req, res) => {
    try {
        const { className, regno, subject, startdate, enddate } = req.query;

        if (!className || !regno || !subject || !startdate || !enddate) {
            return res.status(400).json({ message: 'className, regno, subject, startdate, and enddate are required' });
        }

        const start = new Date(startdate);
        const end = new Date(enddate);

        // if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        //     return res.status(400).json({ message: 'Invalid startDate or endDate format. Use YYYY-MM-DD.' });
        // }

        if (start.getTime() === end.getTime()) {
            end.setHours(23, 59, 59, 999);
        }

        const totalClasses = await attendance.countDocuments({
            className,
            regno,
            subject,
            date: { $gte: start, $lte: end }
        });

        const presentCount = await attendance.countDocuments({
            className,
            regno,
            subject,
            date: { $gte: start, $lte: end },
            present: true
        });

        if (totalClasses === 0) {
            return res.status(404).json({ message: 'No attendance records found for this student within the specified date range' });
        }

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