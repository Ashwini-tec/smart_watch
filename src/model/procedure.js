const mongoose = require("mongoose");

const procedureSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    steps: {
        type: Array,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    }

}, { timestamps: true });


const Procedure = mongoose.model("procedure", procedureSchema);

module.exports = Procedure;