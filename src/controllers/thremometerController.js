const { MESSAGE } = require("../../utils/constant");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const info =  await model.find({ thermometerId: req.body.thermometerId });
        if(info.length > 0){
            info.map( async(item) => {
                item.isActive = false;
                const id = item._id;
                await model.updateOne({_id: id},item);
            });
        }
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
            thermometerId: req.params.id,
        };
        if(req.query.isActive){
            query =  {
                thermometerId: req.params.id,
                isActive: req.query.isActive === "true" ? true : false
            };
        }
        if(req.query.date){
            const timestamp = Number(req.query.createdDate);
            const date = new Date(timestamp);
            query =  {
                thermometerId: req.params.id,
                createdAt: { $gte : date },
            };
        }
        const result =  await model.find(query);
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
        let query = {};
        if(req.query.isActive){
            query =  {
                isActive: req.query.isActive === "true" ? true : false,
            };
        }
        if(req.query.createdDate){
            const timestamp = Number(req.query.createdDate);
            const date = new Date(timestamp);
            query =  {
                createdAt: { $gte : date},
            };
        }
        const result =  await model.find(query);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getById: get(model),
    getAll: getAll(model),
});
