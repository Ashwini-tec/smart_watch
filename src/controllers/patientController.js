
/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query = {};
        if(res.local.role === "SUPER_ADMIN"){
            query ={
                organization: req.query.organization || res.local.organization
            };
        }else{
            query = {
                organization: res.local.organization,
            };
        }
        let result =  await model.find(query).populate("organization",["name"]);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    getAll: getAll(model),
});
