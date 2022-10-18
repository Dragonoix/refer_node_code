const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let crudApi = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        required: true
    }],
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


module.exports = new mongoose.model('CRUDAPI', crudApi);