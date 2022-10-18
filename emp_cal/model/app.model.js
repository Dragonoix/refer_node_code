const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    DA: {
        type: Number,
        required: true
    },
    HRA: {
        type: Number,
        required: true
    },
    grossSalary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey:false
})


module.exports = new mongoose.model('EmpSal', empSchema);