const mongoose = require('mongoose');

const organDonorSchema = new mongoose.Schema({
    fullName: String,
    dateOfBirth: Date,
    phone: String,
    email: String,
    address: String,
    emergencyContact: String,
    medicalConditions: String,
    organPreferences: [String],
    consent: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('OrganDonor', organDonorSchema);