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
            role: Joi.string().required(),
            permission:  Joi.array().items({
                name: Joi.string().required(),
            }),
            password: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            firstName: Joi.string(),
            middleName: Joi.string(),
            lastName: Joi.string(),
            mobile: Joi.string(),
            address: Joi.string(),
            role: Joi.string(),
            permission:  Joi.array().items({
                name: Joi.string().required(),
            }),
        });
    },

    forgotPassword: () => {
        return Joi.object({
            email: Joi.string().required(),
        });
    },

    passwordUpdate: () =>{
        return Joi.object({
            password: Joi.string().required(),
        });
    },
};
