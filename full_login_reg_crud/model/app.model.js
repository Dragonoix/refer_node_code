const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginRegSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('LoginRegis', loginRegSchema);