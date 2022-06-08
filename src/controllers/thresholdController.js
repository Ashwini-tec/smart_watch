const { MESSAGE } = require("../../utils/constant");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const orgId = res.local.organization;
        req.body.organization = orgId;
        const random =  await model.find({});
        const date = new Date();
        const name = `${date.getFullYear()}-${date.getMonth()+1}-${random.length + 1}`;
        req.body.name = name;
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
        const result =  await model.findOne(query);
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
        if(req.query.name){
            query.name = req.query.name;
        }
        const result =  await model.find(query);
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
        const result =  await model.findOne(query);
        if(!result){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const data = await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new : true });
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
});
