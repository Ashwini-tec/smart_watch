const { MESSAGE } = require("../../utils/constant");

/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query = {};
        if(res.local.role === "SUPER_ADMIN"){
            query = {
                organization: req.query.organization || res.local.organization,
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


module.exports = ( model ) => ({
    getAll: getAll(model),
    get: get(model),
});
