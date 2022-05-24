const { MESSAGE } = require("../../utils/constant");
const Procedure = require("../model/procedure");

/********************* create  **************** */
const create = (model) => async(req, res)=>{
    try {
        const query = {
            organization: null,
        };
        const procedures = await Procedure.find(query).lean();
        if(procedures.length == 0){
            return res.status(404).json({
                message: MESSAGE.POCEDURE_NOT_DECLARED,
            });
        }
        req.body.procedures = procedures;
        const result = await model.create(req.body);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
});
