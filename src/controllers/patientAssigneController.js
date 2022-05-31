const { MESSAGE } = require("../../utils/constant");
const Procedure = require("../model/procedure");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const orgId = res.local.organization;
        req.body.organization = orgId;
        req.body.assignedBy = res.local.id;
        req.body.date = Date.now() + 3600000;
        let procedure = await Procedure.findOne({ _id: req.body.procedure });
        if(!procedure){
            return res.status(404).json({ data: MESSAGE.DATA_NOT_FOUND });
        }
        procedure.steps = procedure.steps.map( i => {
            const info = {
                ...i,
                completed : false,
                comments: "",
            };
            return info;
        });
        req.body.procedure = procedure;
        const result = await model.create(req.body);
        return res.status(200).json({ data: result, });
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
            .populate("organization",["name"])
            .populate("assignedTo",{ email:1, firstName:1, lastName:1, role: 1 })
            .populate("patient")
            .populate("assignedBy",["firstName", "lastName"]);
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
        let query = {
            organization: res.local.organization,
        };
        if(req.query.assignedToMe === "true"){
            query = {
                date: { $lt: Date.now() + 86400000 , $gt: Date.now() },
                assignedTo: res.local.id,
                isActive: true,
            };
        }
        const result =  await model.find(query)
            .populate("organization",["name"])
            .populate("assignedTo",{ email:1, firstName:1, lastName:1, role: 1 })
            .populate("patient")
            .populate("assignedBy",["firstName", "lastName"]);
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
        const data = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/***************** update the procedure steps which are completed *********** */
const updateProcedureStatus = (model) => async (req, res) => {
    try {
        let query = {
            _id: req.params.id
        };
        let result =  await model.findOne(query).lean();
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const lengthCheck = result?.procedure?.steps;
        if(req.params.idx < 0 || lengthCheck.length <= req.params.idx){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }

        let doc = result?.procedure?.steps;
        doc[req.params.idx].completed = req.body.status;
        doc[req.params.idx].comments = req.body.comments;
        result.procedure.steps = doc;
        const data = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/******************* complete procedure for the patient *********** */
const setProcedureAsComplete = (model) => async (req, res) => {
    try {
        let query = {
            _id: req.params.id
        };
        let result =  await model.findOne(query).lean();
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }

        result.isActive = req.body.status;
        const data = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });
        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getById: get(model),
    getAll: getAll(model),
    update: update(model),
    updateProcedureStatus: updateProcedureStatus(model),
    setProcedureAsComplete: setProcedureAsComplete(model),
});
