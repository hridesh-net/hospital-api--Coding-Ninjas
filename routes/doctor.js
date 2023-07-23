const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Doctor = require('../models/doctor');

// Route: /doctors/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = new Doctor({ username, password: hashedPassword });
        await doctor.save();

        res.json({ message: 'Doctor registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register doctor.' });
    }
});

// Route: /doctors/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const doctor = await Doctor.findOne({ username });
        if (!doctor) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: doctor._id }, 'your-secret-key');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

module.exports = router;
