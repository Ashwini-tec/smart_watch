const { MESSAGE } = require("../../utils/constant");
const bcrypt = require("bcrypt");
const mailer = require("../../utils/email");
const referralCodeGenerator = require("referral-code-generator");
const Organization = require("../model/organization");
const Role = require("../model/role");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const originalPassword = req.body.password;
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        /*********** check the user duplicate ******** */
        const user = await model.findOne({ email: req.body.email });
        if(user){
            return res.status(400).send({ data: MESSAGE.USER_ALREADY_EXIST });
        }
        /************** check organization exist or not ********** */
        const organization = await Organization.findOne({ _id: req.body.organization });
        if(!organization){
            return res.status(404).send({ data: MESSAGE.ORGANIZATION_NOT_FOUND });
        }
        /************** check role exist or not ************ */
        const roleData = await Role.findOne({ _id: req.body.role });
        if(!roleData){
            return res.status(404).send({ data: MESSAGE.ROLE_NOT_FOUND });
        }

        req.body.permission = roleData?.permission;
        let mail = await mailer.welcomeMail(req.body.email, {
            organization: organization.name,
            email: req.body.email,
            password: originalPassword,
        });
        if(!mail.sent){
            return res.status(200).send({ Message: mail.message });
        }
        const result = await model.create(req.body);
        return res.status(200).json({ data: result });
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
        const result =  await model.find(query)
            .populate("role",["name"])
            .populate("permission.name",{ name: 1, _id: 0 })
            .populate("organization", ["name"])
            .select("-password");
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};


/********************* get by id **************** */
const get = (model) => async(req, res)=>{
    try {
        let query = {
            _id: req.params.id,
        };
        const result =  await model.findOne(query)
            .populate("role",["name"])
            .populate("permission.name",{ name: 1, _id: 0 })
            .populate("organization",["name"]);
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/********************* update  **************** */
const update = (model) => async(req, res)=>{
    try {
        let query = {
            _id: req.params.id
        };
        let result =  await model.findOne(query).lean();
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const info = req.body;
        result = {...result, ...info };
        const data = await model.findOneAndUpdate(
            { _id: req.params.id },
            result, { new : true }
        );
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/********************* forgot password **************** */
const forgotPassword = (model) => async(req,res) => {
    try {
        let query = {
            email: req.body.email,
        };
        const result =  await model.findOne(query);
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const random = referralCodeGenerator.alphaNumeric("uppercase", 5, 3);
        let mail = await mailer.forgotPasssword(result.email, {
            uniqueId: random,
            message: MESSAGE.FORGOT_PASSWORD,
        });
        if(!mail.sent){
            return res.status(200).send({ Message: mail.message });
        }
        const data = await model.findOneAndUpdate(
            { _id: result._id },
            { $set: { uniqueId: random }},
            { new : true }
        );
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/************************** reset password ************ */
const resetPassword = (model) => async(req,res) => {
    try {
        let query = {
            uniqueId: req.params.uniqueId,
        };
        const result =  await model.findOne(query);
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const password = bcrypt.hashSync(req.body.password, 10);
        const data = await model.findOneAndUpdate(
            { _id: result._id },
            { $set: { password: password,uniqueId:"" }},
            { new : true }
        );
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getAll: getAll(model),
    get: get(model),
    update: update(model),
    forgotPassword: forgotPassword(model),
    resetPassword: resetPassword(model),
});
