const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },

}, { timestamps: true });


const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;