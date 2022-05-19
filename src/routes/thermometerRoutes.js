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

/************ get by id ******** */
router.get(
    "/temperature/:id",
    controller(Thermometer).getById
);

module.exports = router;
