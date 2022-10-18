const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    myfile: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('imagestore', pdfSchema);