const express = require('express');
const multer = require('multer');

const router = express.Router();
const PDF=require('../models/pdf')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
    const newPDF = new PDF({
        title: req.body.title,
        file: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        },
    });

    try {
        await newPDF.save();
        res.status(201).json(newPDF);
    } catch (error) {
        res.status(500).send('Error uploading PDF');    
    }
});

router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await PDF.find();
        res.json(pdfs);
    } catch (error) {
        res.status(500).send('Error retrieving PDFs');
    }
});

// router.get('/pdfs/:id', async (req, res) => {
//     try {
//         const pdf = await PDF.findById(req.params.id);
//         if (!pdf) return res.status(404).send('PDF not found');
//         res.set('Content-Type', pdf.file.contentType);
//         res.send(pdf.file.data);
//     } catch (error) {
//         res.status(500).send('Error retrieving PDF');
//     }
// });

module.exports = router;
