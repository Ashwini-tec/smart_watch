const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            assignedTo: Joi.string().required(),
            patient: Joi.string().required(),
            procedure: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            assignedTo: Joi.string(),
            patient: Joi.string(),
        });
    },

    updateStatus: () =>{
        return Joi.object({
            status: Joi.boolean(),
            comments: Joi.string(),
        });
    },

    procedureCompleteStatus: () =>{
        return Joi.object({
            status: Joi.boolean(),
        });
    },
};
