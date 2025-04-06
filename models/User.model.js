const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);