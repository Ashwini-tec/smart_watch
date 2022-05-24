const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
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
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    PCPNDTResistrationNumber:{
        type: String,
    },
    ARTRegistryNumber: {
        type: String,
    },
    LeadDoctorName: {
        type: String,
    },
    logo: {
        type: String,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    procedures: {
        type: Array,
    },

}, { timestamps: true });


const Organization = mongoose.model("organization", organizationSchema);

module.exports = Organization;