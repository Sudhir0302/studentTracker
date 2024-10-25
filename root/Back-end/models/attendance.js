const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
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
    present: {
        type: Boolean,
        required: true
    },
    regno: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date().setHours(0, 0, 0, 0) // Sets date to midnight
    },
    timestamp: {
        type: Date,
        default: Date.now // Current timestamp
    }
});

// Create a compound index to allow multiple records for the same regno on the same day
attendanceSchema.index({ regno: 1, date: 1, subject: 1 }); // Non-unique index

const Attendance = mongoose.model('Attendance', attendanceSchema);


module.exports = Attendance;
