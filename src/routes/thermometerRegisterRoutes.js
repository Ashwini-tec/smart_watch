const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const thermoController = require("../controllers/thermometerRegisterController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/thermometerRegisterSchema");
const ThermometerRegister = require("../model/thermometerRegister");
const authenticate = require("../../utils/auth");
const { PERMS } = require("../../lib/bootstrap");

/********** create ******** */
router.post(
    "/thermometerRegister",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_THERMOMETER),
    validationMiddleware(validateParams.create()),
    thermoController(ThermometerRegister).create
);

/********** get all  ******** */
router.get(
    "/thermometerRegister",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_THERMOMETER),
    thermoController(ThermometerRegister).getAll
);

/************ get by id ******** */
router.get(
    "/thermometerRegister/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_THERMOMETER),
    controller(ThermometerRegister).getById
);

/************ update ******** */
router.put(
    "/thermometerRegister/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_THERMOMETER),
    validationMiddleware(validateParams.update()),
    controller(ThermometerRegister).update
);

module.exports = router;
