const { MESSAGE } = require("../../utils/constant");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const orgId = res.local.organization;
        req.body.organization = orgId;
        let name = req.body.name;
        name = name.toUpperCase();
        const info = await model.findOne({ name: name });
        if(info){
            return res.status(409).send({ data: MESSAGE.DATA_ALREADY_EXIST });
        }
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
        let query = {};
        if(res.local.role === "SUPER_ADMIN"){
            query = {
                $or:[
                    { organization: req.query.organization || res.local.organization },
                    { organization: null }
                ]
            };
        }else{
            query = {
                $or:[
                    { organization: res.local.organization },
                    { organization: null }
                ]
            };
        }
        let result =  await model.find(query)
            .populate("permission.name",["name"])
            .populate("organization",["name"]);
        result = result.map( i => {
            if( i.name !== "SUPER_ADMIN"){
                return i;
            }
        }).reduce( (acc, curr) => {
            if(curr !== undefined){
                acc.push(curr);
            }
            return acc;
        },[]);
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
            .populate("permission.name",["name"])
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

        /******************* if admin role is in change then only super admin can change it
         *  but name of admin can not be changed it is always be a admin ***************** */
        if(result.name === "ADMIN"){
            if(res.local.role !== "SUPER_ADMIN"){
                return res.status(400).send({ data: MESSAGE.PERMISSION_NOT_GIVEN });
            }
            req.body.name = result.name;
            const doc = req.body;
            result = {...result, ...doc};
            const data = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });
            return res.status(200).json({ data: data });
        }

        let name = req.body.name;
        name = name.toUpperCase();
        req.body.name = name;

        /****************** if name of the role is admin then throws error *********** */
        if(req.body.name === "ADMIN"){
            return res.status(400).send({ data: MESSAGE.DATA_ALREADY_EXIST });
        }
        const doc = req.body;
        result = {...result, ...doc};
        const data = await model.findOneAndUpdate({ _id: req.params.id }, result, { new : true });
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
});
