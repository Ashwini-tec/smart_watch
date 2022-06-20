const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const roleController = require("../controllers/roleController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/roleSchema");
const Role = require("../model/role");
const { PERMS } = require("../../lib/bootstrap");
const authenticate = require("../../utils/auth");

/********** create ******** */
router.post(
    "/role",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_ROLE),
    validationMiddleware(validateParams.create()),
    roleController(Role).create
);

/********** get all  ******** */
router.get(
    "/role",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ROLE),
    roleController(Role).getAll
);

/************ get by id ******** */
router.get(
    "/role/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ROLE),
    roleController(Role).get
);

/************ update by id ******** */
router.put(
    "/role/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_ROLE),
    validationMiddleware(validateParams.update()),
    controller(Role).update
);

module.exports = router;
