const Joi = require("joi");

module.exports = {
    register: () =>{
        return Joi.object({
            channel_1: Joi.number().required(),
            channel_2: Joi.number().required(),
            channel_3: Joi.number().required(),
            channel_4: Joi.number().required(),
            channel_5: Joi.number().required(),
            channel_6: Joi.number().required(),
            channel_7: Joi.number().required(),
            channel_8: Joi.number().required(),
        });
    },

    update: () =>{
        return Joi.object({
            channel_1: Joi.number().required(),
            channel_2: Joi.number().required(),
            channel_3: Joi.number().required(),
            channel_4: Joi.number().required(),
            channel_5: Joi.number().required(),
            channel_6: Joi.number().required(),
            channel_7: Joi.number().required(),
            channel_8: Joi.number().required(),
        });
    },
};
