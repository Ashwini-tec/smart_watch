const { MESSAGE } = require("../../utils/constant");
const Organization = require("../model/organization");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        let orgId;
        if(res.local.role === "SUPER_ADMIN"){
            orgId = undefined;
        }else{
            orgId = res.local.organization;
        }
        req.body.organization = orgId;
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
            isActive: true,
        };
        if(res.local.role === "SUPER_ADMIN"){
            query = {
                organization: req.query.organization,
            };
        }
        let result =  await model.find(query);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};


/********************* get by id **************** */
const getById = (model) => async(req, res)=>{
    try {
        let query = {
            _id: req.params.id,
        };
        const result =  await model.findOne(query);
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
        const doc = req.body;
        result = {...result, ...doc};
        const modelData = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });

        // ****** ----> to update all the organizations default procedures
        if(req.query.updateAll === "true"){
            const procedureId = result._id;
            const org = await Organization.find({ procedures: { $elemMatch: { _id: procedureId }} }).lean();
            await Promise.all( org.map( async (data) => {
                const info = data.procedures.map( (item) => {
                    const id = String(item._id);
                    const procedure = String(procedureId);
                    if(id === procedure){
                        item = { ...item, ...req.body };
                        return item;
                    }
                    return item;
                });
                data.procedures = info;
                await Organization.findOneAndUpdate({ _id: data._id }, data );
            }));
        }
        return res.status(200).json({ data: modelData });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};


module.exports = ( model ) => ({
    create: create(model),
    getAll: getAll(model),
    getById: getById(model),
    update: update(model),
});
