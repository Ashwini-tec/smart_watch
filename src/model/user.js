const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

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
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    },
    password: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    permission: [{
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "permission",
        },
    }],
    uniqueId: {
        type: String,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },

}, { timestamps: true });


const User = mongoose.model("user", userSchema);

module.exports = User;