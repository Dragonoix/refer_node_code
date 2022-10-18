const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('singer', singerSchema);