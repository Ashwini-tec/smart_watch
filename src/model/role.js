const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
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


const Role = mongoose.model("role", roleSchema);

module.exports = Role;