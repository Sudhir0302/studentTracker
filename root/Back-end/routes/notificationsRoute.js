const express=require('express')
const router=express.Router();

const note=require('../models/notifications');

router.post('/',async(req,res)=>{
    try{
        const data=new note(req.body);
        const saved=await data.save();
        // console.log(saved);
        res.status(201).json(saved);
    }catch(error){
        console.log(error);
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await note.find();
        res.send(data);
    }catch(error){
        console.log(error);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedNote = await note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).json({ message: 'Failed' });
    }
});

module.exports=router