const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            required: true,
        },
        regno: {
            type: String,
            required: true,
            unique: true,  // Ensure unique registration numbers
        },
    },
    {
        timestamps: true, // Optional: add createdAt and updatedAt fields
    }
);

// Create the model with the correct name
const student = mongoose.model('student', StudentSchema);

module.exports = student;
