const express = require('express');
const app = express();
const mongoose = require('mongoose');
const doctorsRoute = require('./routes/doctors');
const patientsRoute = require('./routes/patients');
const reportsRoute = require('./routes/reports');
const jwt = require('jsonwebtoken');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON data
app.use(express.json());

// Authentication middleware
const authenticateDoctor = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access.' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Routes
app.use('/doctors', doctorsRoute);
app.use('/patients', patientsRoute);
app.use('/reports', authenticateDoctor, reportsRoute);

// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
