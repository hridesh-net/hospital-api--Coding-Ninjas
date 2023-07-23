const express = require('express');
const router = express.Router();

const Patient = require('../models/patient');
const Report = require('../models/report');

// Route: /patients/register
router.post('/register', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const patient = new Patient({ phoneNumber });
        await patient.save();

        res.json({ message: 'Patient registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register patient.' });
    }
});

// Route: /patients/:id/create_report
router.post('/:id/create_report', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        const doctorId = req.user.id; // Assuming that the doctor's ID is stored in the request object after authentication.
        const report = new Report({ patient: id, doctor: doctorId, status });
        await report.save();

        res.json({ message: 'Report created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create report.' });
    }
});

// Route: /patients/:id/all_reports
router.get('/:id/all_reports', async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        const reports = await Report.find({ patient: id }).sort({ date: 1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient reports.' });
    }
});

module.exports = router;
