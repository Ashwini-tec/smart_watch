const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const Permission = mongoose.model("permission", permissionSchema);

module.exports = Permission;