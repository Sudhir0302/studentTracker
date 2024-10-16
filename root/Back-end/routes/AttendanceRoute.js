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

module.exports=router