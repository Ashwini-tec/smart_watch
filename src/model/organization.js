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
    image:{
        type: String,
    },
    discription:{
        type: String,
    },
    bannerImage: {
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