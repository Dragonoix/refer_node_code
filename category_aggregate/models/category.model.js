const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('category', categorySchema);