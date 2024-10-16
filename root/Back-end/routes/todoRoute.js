const express= require('express');
const router=express.Router();

const todo=require('../models/todo');

router.post('/',async(req,res)=>{
    try{
        const data=new todo(req.body);
        const savedData = await data.save();  
        console.log(savedData);  
        res.status(201).json(savedData); 
    }
    catch(error){
        console.log(error)
    }
})

router.get('/',async(req,res)=>{
    try {
        const data=await todo.find();
        res.status(200).json(data);     
    } catch (error) {
        console.error(error);
    }
})

router.put('/put/:id', async (req, res) => {
    try {
        const updatedTodo = await todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
        res.status(200).json(updatedTodo);  // Send the updated item as response
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Failed to update todo item' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTodo = await todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
        res.status(200).json({ message: 'Todo item deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Failed to delete todo item' });
    }
});

module.exports=router