const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    grossamount: {
        type: Number,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = new mongoose.model('cart', cartSchema);