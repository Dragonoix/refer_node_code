const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    goods: {
        type: Schema.Types.ObjectId,
        ref: 'goods',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('sales', salesSchema);