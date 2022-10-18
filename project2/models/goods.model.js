const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('goods', goodsSchema);