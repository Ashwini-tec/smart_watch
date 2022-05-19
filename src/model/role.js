const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const Role = mongoose.model("role", roleSchema);

module.exports = Role;