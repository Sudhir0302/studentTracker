const mongoose=require('mongoose');

const pdfSchema = new mongoose.Schema({
    regno: String,
    dept:String,
    section:String,
    subject: String,
    file: {
        data: Buffer,
        contentType: String,
    },
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;