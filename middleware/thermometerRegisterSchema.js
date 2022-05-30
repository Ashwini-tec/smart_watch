const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            thermometerId: Joi.string().required(),
            threshold: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            thermometerId: Joi.string(),
            threshold: Joi.string(),
            organization: Joi.string().required(),
        });
    },
};
