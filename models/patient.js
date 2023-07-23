const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
