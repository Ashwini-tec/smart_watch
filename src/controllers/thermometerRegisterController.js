const Organization = require("../model/organization");
const referralCodeGenerator = require("referral-code-generator");
const { MESSAGE } = require("../../utils/constant");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const info = await model.findOne({ thermometerId: req.params.thermometerId });
        if(info){
            return res.status(404).send({ data: MESSAGE.DATA_ALREADY_EXIST });
        }
        const random = referralCodeGenerator.alphaNumeric("uppercase", 1, 2);
        const date = new Date();
        const name = `${date.getFullYear()}-${date.getMonth()+1}-${random}`;
        req.body.name = name;
        const result = await model.create(req.body);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/********************* create  **************** */
const update = (model) => async(req, res)=>{
    try {
        let info = await model.findOne({ thermometerId: req.params.thermometerId }).lean();
        if(!info){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const orgName = await Organization.findOne({ _id: req.body.organization });
        const name = `${orgName.name}-${info.name}`;
        req.body.name = name;
        const body = req.body;
        info = {
            ...info,
            body,
            organization: req.body.organization
        };
        const result = await model.findOneAndUpdate({ _id: info._id }, info, { new : true });
        return res.status(200).json({ data: result, });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};


/********************* get by id **************** */
const get = (model) => async(req, res)=>{
    try {
        let query = {
            thermometerId: req.params.thermometerId,
        };
        const result =  await model.findOne(query).populate("threshold");
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query;
        if(res.local.role === "SUPER_ADMIN"){
            query = {
            };
        }else{
            query = {
                organization: res.local.organization,
            };
        }
        let result =  await model.find(query).populate("threshold");
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getAll: getAll(model),
    update: update(model),
    getById: get(model),
});
