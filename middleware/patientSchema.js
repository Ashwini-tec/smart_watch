const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            firstName: Joi.string().required(),
            middleName: Joi.string(),
            lastName: Joi.string(),
            mobile: Joi.string(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
        });
    },

    update: () =>{
        return Joi.object({
            firstName: Joi.string(),
            middleName: Joi.string(),
            lastName: Joi.string(),
            mobile: Joi.string(),
            address: Joi.string(),
            email: Joi.string().email(),
        });
    },
};
