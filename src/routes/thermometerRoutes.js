const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/thremometerController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/thermometerSchema");
const Thermometer = require("../model/thermometer");

/********** create ******** */
router.post(
    "/temperature",
    validationMiddleware(validateParams.register()),
    controller(Thermometer).create
);

/********** get all  ******** */
router.get(
    "/temperature",
    controller(Thermometer).getAll
);

/********** compare channels with live data  ******** */
router.get(
    "/temperature/compare/:thermometerId",
    controller(Thermometer).compare
);

module.exports = router;
