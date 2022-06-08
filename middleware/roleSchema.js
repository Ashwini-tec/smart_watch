const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().not("SUPER_ADMIN", "ADMIN").uppercase().required(),
            permission:  Joi.array().items({
                name: Joi.string().required(),
            }),
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string().not("SUPER_ADMIN", "ADMIN").uppercase().required(),
            permission:  Joi.array().items({
                name: Joi.string().required(),
            }),
        });
    },
};
