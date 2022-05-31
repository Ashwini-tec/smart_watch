const Joi = require("joi");

module.exports = {
    create: () =>{
        return Joi.object({
            name: Joi.string().required(),
            DOB: Joi.string().required(),
            bloodGroup: Joi.string().required(),
            gender: Joi.string().valid( "male", "female", "other" ).required(),
            picture: Joi.string().required(),
            identifyProof: Joi.string().required(),
            citizenship: Joi.string().required(),
            patientType: Joi.string().valid( "patient", "surrogate", "donor" ),
            cycleType: Joi.string().valid( "self-IVF", "egg-donor", "surrogate", "IUI" ),
            metaData: Joi.object({
                name: Joi.string().required(),
                DOB: Joi.string().required(),
                bloodGroup: Joi.string().required(),
                gender: Joi.string().valid( "male", "female", "other" ).required(),
                picture: Joi.string().required(),
                identifyProof: Joi.string().required(),
                citizenship: Joi.string().required(),
            }).when(
                "patientType",
                {
                    is: "patient",
                    then: Joi.required(),
                    otherwise: Joi.optional(),
                }
            )
        });
    },

    update: () =>{
        return Joi.object({
            name: Joi.string(),
            DOB: Joi.string(),
            bloodGroup: Joi.string(),
            gender: Joi.string().valid( "male", "female", "other" ).required(),
            picture: Joi.string(),
            identifyProof: Joi.string(),
            citizenship: Joi.string(),
            patientType: Joi.string().valid( "patient", "surrogate", "donor" ),
            cycleType: Joi.string().valid( "self-IVF", "egg-donor", "surrogate", "IUI" ),
            metaData: Joi.object({
                name: Joi.string().required(),
                DOB: Joi.string().required(),
                bloodGroup: Joi.string().required(),
                gender: Joi.string().valid( "male", "female", "other" ).required(),
                picture: Joi.string().required(),
                identifyProof: Joi.string().required(),
                citizenship: Joi.string().required(),
            }).when(
                "patientType",
                {
                    is: "patient",
                    then: Joi.required(),
                    otherwise: Joi.optional(),
                }
            )
        });
    },
};
