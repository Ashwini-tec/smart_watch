const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().required(),
            mobile: Joi.string(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            PCPNDTResistrationNumber: Joi.string().required(),
            ARTRegistryNumber: Joi.string().required(),
            LeadDoctorName: Joi.string().required(),
            logo: Joi.string().required(),
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string().required(),
            mobile: Joi.string(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            PCPNDTResistrationNumber: Joi.string().required(),
            ARTRegistryNumber: Joi.string().required(),
            LeadDoctorName: Joi.string().required(),
            logo: Joi.string().required(),
        });
    },
};
