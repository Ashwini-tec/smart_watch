const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_CONFIG || "mongodb://localhost:27017/smartWatch", //process.env.PRODUCTION_DB_CONFIG for production db
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(console.log("/ DataBase connected .." ))
    .catch(err => console.log("/ Error : ",err.message ));

module.exports = mongoose;