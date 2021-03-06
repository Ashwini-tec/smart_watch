const bodyParser = require("body-parser");
const express = require("express");
const thermometerRoutes = require("./src/routes/thermometerRoutes");
const thresholdConstantRoutes = require("./src/routes/thresholdConstantRoutes");
const userRoutes =  require("./src/routes/userRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const organizationRoutes = require("./src/routes/organizationRoutes");
const permissionRoutes = require("./src/routes/permissionRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const procedureRoutes = require("./src/routes/procedureRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const thermometerRegisterRoutes = require("./src/routes/thermometerRegisterRoutes");
const patientAssigneRoutes = require("./src/routes/patientAssigneRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const app = express();
require("dotenv").config();
require("./config/db");
const cors = require("cors");
const bootstrapData = require("./lib/index");
const path = require("path");

global.__basedir = __dirname;
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//set view engine
app.set("view engine", "ejs");

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(YAML.load(__dirname + "/api-docs.yml"))
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/********** bootstraping data */
bootstrapData();

/************* api to get logo ********/
app.use("/public/", express.static(path.join(global.__basedir,"/public/image")));

/*************** reset password template *********** */
app.use("/public/resetPassword", (req, res)=>{
    res.render(path.join(global.__basedir,"/public/resetPassword.ejs"),{ baseUrl: process.env.BASE_URL });
});

/***************** routes *********************/
app.use("/api", thermometerRoutes);
app.use("/api", thresholdConstantRoutes);
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", permissionRoutes);
app.use("/api", organizationRoutes);
app.use("/api", loginRoutes);
app.use("/api", procedureRoutes);
app.use("/api", thermometerRegisterRoutes);
app.use("/api", patientRoutes);
app.use("/api", patientAssigneRoutes);

const port = process.env.PORT || 8000;
app.listen(port,()=> { console.log(`server is running on port ${port} ....` );});
