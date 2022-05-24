const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/procedureController");
const crudController = require("../controllers/CRUDController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/procedureSchema");
const Procedure = require("../model/procedure");
const { PERMS } = require("../../lib/bootstrap");
const authenticate = require("../../utils/auth");


/************ create ******** */
router.post(
    "/procedure",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_PROCEDURE),
    validationMiddleware(validateParams.create()),
    controller(Procedure).create
);

/********** get all  ******** */
router.get(
    "/procedure",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PROCEDURE),
    controller(Procedure).getAll
);

/************ get by id ******** */
router.get(
    "/procedure/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PROCEDURE),
    controller(Procedure).getById
);

/************ update ******** */
router.put(
    "/procedure/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_PROCEDURE),
    validationMiddleware(validateParams.update()),
    controller(Procedure).update
);

/************ delete ******** */
router.delete(
    "/procedure/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.DELETE_PROCEDURE),
    crudController(Procedure).deleteById
);

module.exports = router;
