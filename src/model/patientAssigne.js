const mongoose = require("mongoose");

const patientAssigneSchema = new mongoose.Schema({

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
    },
    procedure: {},
    assignedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },
    date:{
        type: Number,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const PatientAssigne = mongoose.model("patientAssigne", patientAssigneSchema);

module.exports = PatientAssigne;