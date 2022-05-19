const Joi = require("joi");

module.exports = {
    register: () =>{
        return Joi.object({
            channel_1: Joi.number().optional(),
            channel_2: Joi.number().optional(),
            channel_3: Joi.number().optional(),
            channel_4: Joi.number().optional(),
            channel_5: Joi.number().optional(),
            channel_6: Joi.number().optional(),
            channel_7: Joi.number().optional(),
            channel_8: Joi.number().optional(),
        });
    },

    update: () =>{
        return Joi.object({
            channel_1: Joi.number().optional(),
            channel_2: Joi.number().optional(),
            channel_3: Joi.number().optional(),
            channel_4: Joi.number().optional(),
            channel_5: Joi.number().optional(),
            channel_6: Joi.number().optional(),
            channel_7: Joi.number().optional(),
            channel_8: Joi.number().optional(),
        });
    },
};
