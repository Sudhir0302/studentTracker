const mongoose=require('mongoose');

const notificationsSchema=new mongoose.Schema({
    msg:{
        type: String,
        required: true
    }
})

const notifications=mongoose.model('note',notificationsSchema);

module.exports=notifications;   