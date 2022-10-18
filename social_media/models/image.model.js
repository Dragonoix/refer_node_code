const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    myName: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required: true
    },
    dislike: {
        type: Number,
        required: true
    },
    myImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('social', imageSchema);