
/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query = {
            $or:[
                { organization: res.local.organization },
                { organization: null }
            ]
        };
        let result =  await model.find(query).populate("organization",["name"]);
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

module.exports = ( model ) => ({
    getAll: getAll(model),
});
