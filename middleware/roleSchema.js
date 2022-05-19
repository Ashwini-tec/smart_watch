const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string().required(),
        });
    },
};
