const express = require('express');
const router = express.Router();

const Report = require('../models/report');

// Route: /reports/:status
router.get('/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const reports = await Report.find({ status });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports.' });
    }
});

module.exports = router;
