const express = require('express');
const multer = require('multer');

const router = express.Router();
const PDF=require('../models/pdf')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
    // Log the incoming request for debugging
    // console.log('File received:', req.file);
    // console.log('Request body:', req.body);

    // Check if the file is received
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const newPDF = new PDF({
        regno: req.body.regno,
        dept: req.body.dept,
        section: req.body.section,
        subject: req.body.subject,
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
        const pdfs = await PDF.find({ regno: req.query.regno });
        if (!pdfs) return res.status(404).send('PDF with the given ID not found');
        res.json(pdfs);
    } catch (error) {
        res.status(500).send('Error retrieving PDFs');
    }
});

router.get('/pdfs/teacher', async (req, res) => {
    try {
        const { department, section ,sub} = req.query; 
        const pdfs = await PDF.find({ dept: department, section: section ,subject:sub}); 

        if (!pdfs || pdfs.length === 0) {
            return res.status(200).json([]); 
        }
        
        res.json(pdfs);
    } catch (error) {
        console.error(error); 
        // res.status(500).send('Error retrieving PDFs');
    }
});

router.get('/pdfs/view/:id', async (req, res) => {
    try {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) return res.status(404).send('PDF not found');
        res.set({
            'Content-Type': pdf.file.contentType,
            'Content-Disposition': `inline; filename="${pdf.title}.pdf"`,
        });
        res.send(pdf.file.data);
    } catch (error) {
        res.status(500).send('Error retrieving PDF');
    }
});

router.get('/pdfs/download/:id', async (req, res) => {
    try {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) return res.status(404).send('PDF not found');
        res.set({
            'Content-Type': pdf.file.contentType,
            'Content-Disposition': `attachment; filename="${pdf.title}.pdf"`,
        });
        res.send(pdf.file.data);
    } catch (error) {
        res.status(500).send('Error retrieving PDF');
    }
});

router.delete('/pdfs/delete/:id', async (req, res) => {
    try {
        const deletedPdf = await PDF.findByIdAndDelete(req.params.id);
        // console.log(pdf);
        if (!deletedPdf) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ message: 'deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to delete' });
    }
});

module.exports = router;
