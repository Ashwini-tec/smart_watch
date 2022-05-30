const mongoose = require("mongoose");

const thresholdConstantSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    channel_1: {
        type: Number,
        required: true,
    },
    channel_2: {
        type: Number,
        required: true,
    },
    channel_3: {
        type: Number,
        required: true,
    },
    channel_4: {
        type: Number,
        required: true,
    },
    channel_5: {
        type: Number,
        required: true,
    },
    channel_6: {
        type: Number,
        required: true,
    },
    channel_7: {
        type: Number,
        required: true,
    },
    channel_8: {
        type: Number,
        required: true,
    },
    organization:{
        type: String,
    }

}, { timestamps: true });

const ThresholdConstant = mongoose.model("thresholdConstant", thresholdConstantSchema);

module.exports = ThresholdConstant;
