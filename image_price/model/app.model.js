const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    artistName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('imagestore', imageSchema);