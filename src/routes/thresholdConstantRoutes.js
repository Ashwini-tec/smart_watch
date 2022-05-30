const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/thresholdController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/thresholdConstantSchema");
const authenticate = require("../../utils/auth");
const ThresholdConstant = require("../model/thresholdConstant");
const { PERMS } = require("../../lib/bootstrap");

/********** create ******** */
router.post(
    "/thresholdConstant",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_THRESHOLD),
    validationMiddleware(validateParams.register()),
    controller(ThresholdConstant).create
);

/********** get all  ******** */
router.get(
    "/thresholdConstant",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_THRESHOLD),
    controller(ThresholdConstant).getAll
);

/************ get by id ******** */
router.get(
    "/thresholdConstant/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_THRESHOLD),
    controller(ThresholdConstant).getById
);

/************ update by id ******** */
router.put(
    "/thresholdConstant/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_THRESHOLD),
    validationMiddleware(validateParams.update()),
    controller(ThresholdConstant).update
);

module.exports = router;
