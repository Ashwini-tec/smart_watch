const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    DOB:{
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    gender: {
        type: String,
        enum: [ "male", "female", "other" ],
    },
    picture: {
        type: String,
    },
    identifyProof: {
        type: String,
    },
    citizenship: {
        type: String,
    },
    patientType: {
        type: String,
        enum: [ "patient", "surrogate", "donor" ],
    },
    cycleType: {
        type: String,
        enum: [ "self-IVF", "egg-donor", "surrogate", "IUI" ]
    },
    type: {
        type: String,
        enum: [ "P1", "P2"],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },
    isActive:{
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;