const mongoose=require('mongoose');

const attendanceSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    present:{
        type: Boolean,
        required: true
    },
    regno:{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    _id:false
});

const attendance = mongoose.model('attendance', attendanceSchema);

module.exports = attendance;