const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            thermometerId: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            thermometerId: Joi.string().required(),
        });
    },
};
