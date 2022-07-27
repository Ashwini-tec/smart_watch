const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            assignedTo: Joi.string().required(),
            patient: Joi.string().required(),
            procedure: Joi.object({
                name: Joi.string().required(),
                discription: Joi.string(),
                steps: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required(),
                        discription: Joi.string(),
                    }).required(),
                ),
            }).required(),
        });
    },

    update: () =>{
        return Joi.object({
            assignedTo: Joi.string().required(),
            patient: Joi.string().required(),
        });
    },

    updateStatus: () =>{
        return Joi.object({
            status: Joi.boolean().required(),
            comments: Joi.string().required(),
        });
    },

    procedureCompleteStatus: () =>{
        return Joi.object({
            status: Joi.boolean().required(),
        });
    },
};
