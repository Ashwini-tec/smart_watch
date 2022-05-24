const Organization = require("../model/organization");
const referralCodeGenerator = require("referral-code-generator");

/********************* create  **************** */
const create = (model) => async(req, res)=>{console.log("::::::::::::", req.body, res.local.organization);
    try {
        const orgId = res.local.organization;
        req.body.organization = orgId;
        const orgName = await Organization.findOne({ _id: orgId });
        const date = new Date();
        const random = referralCodeGenerator.alphaNumeric("uppercase", 1, 2);
        const name = `${orgName.name}-${date.getFullYear()}-${date.getMonth()}-${random}`;
        req.body.name = name;
        const result = await model.create(req.body);
        return res.status(200).json({ data: result, });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query = {
            organization: res.local.organization,
        };
        let result =  await model.find(query).populate("organization",["name"]);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getAll: getAll(model),
});
