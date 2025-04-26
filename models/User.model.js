// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     bloodGroup: {
//         type: String,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     }
// })

// module.exports = mongoose.model('User', userSchema);


// new code
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['donor', 'receiver'], default: 'donor' },
  bloodType: String,
  location: String,
  phone: String,
  lastDonation: Date,
  isDonor: Boolean,
  organDonor: { type: Boolean, default: false },
  organs: [{ type: String }],
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);