const mongoose=require('mongoose');

const pdfSchema = new mongoose.Schema({
    title: String,
    file: {
        data: Buffer,
        contentType: String,
    },
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;