const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    checked:{
        type: Boolean,
        required:true
    }
})

const todo=mongoose.model('todo',todoSchema);

module.exports=todo;