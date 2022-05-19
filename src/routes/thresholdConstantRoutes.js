const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/thresholdController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/thresholdConstantSchema");
const ThresholdConstant = require("../model/thresholdConstant");

/********** create ******** */
router.post(
    "/thresholdConstant",
    validationMiddleware(validateParams.register()),
    controller(ThresholdConstant).create
);

/********** get all  ******** */
router.get(
    "/thresholdConstant",
    controller(ThresholdConstant).getAll
);

/************ get by id ******** */
router.get(
    "/thresholdConstant/:id",
    controller(ThresholdConstant).getById
);

/************ update by id ******** */
router.put(
    "/thresholdConstant/:id",
    validationMiddleware(validateParams.update()),
    controller(ThresholdConstant).update
);

module.exports = router;
