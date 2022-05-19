const mongoose = require("mongoose");

const thermometerSchema = new mongoose.Schema({

    thermometerId: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    temperature:{
        type: Array,
        required: true,
    },

}, { timestamps: true });


const Thermometer = mongoose.model("thermometer", thermometerSchema);

module.exports = Thermometer;