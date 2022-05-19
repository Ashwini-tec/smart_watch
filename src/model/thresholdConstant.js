const mongoose = require("mongoose");

const thresholdConstantSchema = new mongoose.Schema({

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

}, { timestamps: true });

const ThresholdConstant = mongoose.model("thresholdConstant", thresholdConstantSchema);

module.exports = ThresholdConstant;
