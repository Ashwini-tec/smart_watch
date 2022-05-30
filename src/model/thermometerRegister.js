const mongoose = require("mongoose");

const thermometerRegisterSchema = new mongoose.Schema({

    thermometerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    threshold: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thresholdConstant",
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },

}, { timestamps: true });


const ThermometerRegister = mongoose.model("thermometerRegister", thermometerRegisterSchema);

module.exports = ThermometerRegister;