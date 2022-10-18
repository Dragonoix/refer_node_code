const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    MyName: {
        type: String,
        required: true
    },
    MyEmail: {
        type: String,
        required: true
    },
    MyDate: {
        type: Date,
        required: true
    },
    MyGender: {
        type: String,
        required: true
    },
    MyEducation: {
        type: String,
        required: true
    },
    MyEligibility: [{
        type: String,
        required: true
    }],
    MyPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = new mongoose.model('NewUserRegAccount', loginSchema);

