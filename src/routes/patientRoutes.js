const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const patientController = require("../controllers/patientController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/patientSchema");
const Patient = require("../model/patient");
const authenticate = require("../../utils/auth");
const { PERMS } = require("../../lib/bootstrap");

/********** create ******** */
router.post(
    "/patient",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_PATIENT),
    validationMiddleware(validateParams.create()),
    controller(Patient).create
);

/********** get all  ******** */
router.get(
    "/patient",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PATIENT),
    patientController(Patient).getAll
);

/************ get by id ******** */
router.get(
    "/patient/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PATIENT),
    controller(Patient).getById
);

/************ update by id ******** */
router.put(
    "/patient/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_PATIENT),
    validationMiddleware(validateParams.update()),
    controller(Patient).update
);

module.exports = router;
