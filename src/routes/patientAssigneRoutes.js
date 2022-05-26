const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/patientAssigneController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/assignePatientSchema");
const PatientAssigne = require("../model/patientAssigne");
const authenticate = require("../../utils/auth");
const { PERMS } = require("../../lib/bootstrap");

/********** create ******** */
router.post(
    "/patientAssignee",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.ASSIGNE_PATIENT),
    validationMiddleware(validateParams.create()),
    controller(PatientAssigne).create
);

/********** get all  ******** */
router.get(
    "/patientAssignee",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ASSIGNE_PATIENT),
    controller(PatientAssigne).getAll
);

/************ get by id ******** */
router.get(
    "/patientAssignee/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ASSIGNE_PATIENT),
    controller(PatientAssigne).getById
);

/************ update by id ******** */
router.put(
    "/patientAssignee/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_ASSIGNE_PATIENT),
    validationMiddleware(validateParams.update()),
    controller(PatientAssigne).update
);

/************ update by procedure status by id ******** */
router.put(
    "/patientAssignee/procedure/:id/:idx",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_ASSIGNE_PATIENT_PROCEDURE),
    validationMiddleware(validateParams.updateStatus()),
    controller(PatientAssigne).updateProcedureStatus
);

module.exports = router;
