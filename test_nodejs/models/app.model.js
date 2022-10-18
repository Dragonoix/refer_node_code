const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        required: true
    },
    image: {
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


module.exports = new mongoose.model('docs', imageSchema);