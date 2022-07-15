const { MESSAGE } = require("../../utils/constant");
const ThermometerRegister = require("../model/thermometerRegister");

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

/********************* get all  **************** */
const getAll = (model) => async(req, res)=>{
    try {
        let query = {};
        if(req.query.isActive){
            query.isActive = req.query.isActive === "true" ? true : false;
        }
        if(req.query.createdDate){
            const timestamp = Number(req.query.createdDate);
            const date = new Date(timestamp);
            query.createdAt =  {
                $gte : date,
                $lt: date + 86400000
            };
        }
        if(req.query.thermometerId){
            const info =  await model.find(query);
            if(!info){
                return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
            }
            query.thermometerId = req.query.thermometerId;
        }
        const result =  await model.find(query);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

/******************** compare live data with threshold constant *********** */
const compare = ( model ) => async(req, res) =>{
    try {
        let query = {
            _id: req.params.id,
        };
        const info =  await model.findOne(query);
        if(!info){
            return res.status(404).send({ data: MESSAGE.DATA_NOT_FOUND });
        }
        const registerData = await ThermometerRegister.findOne({ thermometerId: info.thermometerId }).populate("threshold");
        const liveData ={
            liveData: {
                channel_1: info?.temperature[0].channel_1,
                channel_2: info?.temperature[1].channel_2,
                channel_3: info?.temperature[2].channel_3,
                channel_4: info?.temperature[3].channel_4,
                channel_5: info?.temperature[4].channel_5,
                channel_6: info?.temperature[5].channel_6,
                channel_7: info?.temperature[6].channel_7,
                channel_8: info?.temperature[7].channel_8,
            }
        };
        if(!registerData){
            return res.status(200).send({ Message: MESSAGE.THERMOMETER_NOT_REGIESTER, data : liveData });
        }
        const result = {
            liveData: liveData.liveData,
            thresholdConstant: {
                channel_1: registerData?.threshold?.channel_1,
                channel_2: registerData?.threshold?.channel_2,
                channel_3: registerData?.threshold?.channel_3,
                channel_4: registerData?.threshold?.channel_4,
                channel_5: registerData?.threshold?.channel_5,
                channel_6: registerData?.threshold?.channel_6,
                channel_7: registerData?.threshold?.channel_7,
                channel_8: registerData?.threshold?.channel_8,
            },
            status: {
                channel_1: (info?.temperature[0].channel_1 > registerData?.threshold?.channel_1 || info?.temperature[0].channel_1 < registerData?.threshold?.channel_1) ? "Over The Limit" : "In Limit",
                channel_2: (info?.temperature[1].channel_2 > registerData?.threshold?.channel_2 || info?.temperature[1].channel_2 < registerData?.threshold?.channel_2) ? "Over The Limit" : "In Limit",
                channel_3: (info?.temperature[2].channel_3 > registerData?.threshold?.channel_3 || info?.temperature[2].channel_3 < registerData?.threshold?.channel_3) ? "Over The Limit" : "In Limit",
                channel_4: (info?.temperature[3].channel_4 > registerData?.threshold?.channel_4 || info?.temperature[3].channel_4 < registerData?.threshold?.channel_4) ? "Over The Limit" : "In Limit",
                channel_5: (info?.temperature[4].channel_5 > registerData?.threshold?.channel_5 || info?.temperature[4].channel_5 < registerData?.threshold?.channel_5) ? "Over The Limit" : "In Limit",
                channel_6: (info?.temperature[5].channel_6 > registerData?.threshold?.channel_6 || info?.temperature[5].channel_6 < registerData?.threshold?.channel_6) ? "Over The Limit" : "In Limit",
                channel_7: (info?.temperature[6].channel_7 > registerData?.threshold?.channel_7 || info?.temperature[6].channel_7 < registerData?.threshold?.channel_7) ? "Over The Limit" : "In Limit",
                channel_8: (info?.temperature[7].channel_8 > registerData?.threshold?.channel_8 || info?.temperature[7].channel_8 < registerData?.threshold?.channel_8) ? "Over The Limit" : "In Limit",
            }
        };

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).send({ data: error.message });
    }
};

module.exports = ( model ) => ({
    create: create(model),
    getAll: getAll(model),
    compare: compare(model),
});
