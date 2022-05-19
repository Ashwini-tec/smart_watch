const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().required(),
            mobile: Joi.string(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
            image: Joi.string(),
            bannerImage: Joi.string(),
            discription: Joi.string(),
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string(),
            mobile: Joi.string(),
            address: Joi.string(),
            email: Joi.string().email(),
            image: Joi.string(),
            bannerImage: Joi.string(),
            discription: Joi.string(),
        });
    },
};
