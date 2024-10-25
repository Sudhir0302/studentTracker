const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    regno: String,
    dept: String,
    section: String,
    subject: String,
    file: {
        data: Buffer,
        contentType: String,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    marks: { // New field for marks
        type: Number,
        default: null, // Default can be null or any initial value
    }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
