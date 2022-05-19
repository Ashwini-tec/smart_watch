const Joi = require("joi");

module.exports = {
    register: () =>{
        return Joi.object({
            thermometerId: Joi.string().required(),
            temperature: Joi.array().items(
                Joi.object({
                    channel_1: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_2: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_3: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_4: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_5: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_6: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_7: Joi.number().required(),
                }).required(),
                Joi.object({
                    channel_8: Joi.number().required(),
                }).required()
            ).required(),
        });
    },
};
