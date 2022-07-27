const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().required(),
            discription: Joi.string().required(),
            steps: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    discription: Joi.string(),
                }).required(),
            ),
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string().required(),
            discription: Joi.string().required(),
            steps: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    discription: Joi.string(),
                }).required(),
            ),
        });
    },
};
