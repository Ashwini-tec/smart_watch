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
    authenticate.permissionAuth(PERMS.CREATE),
    validationMiddleware(validateParams.create()),
    controller(Role).create
);

/********** get all  ******** */
router.get(
    "/role",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH),
    roleController(Role).getAll
);

/************ get by id ******** */
router.get(
    "/role/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH),
    controller(Role).getById
);

/************ update by id ******** */
router.put(
    "/role/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE),
    validationMiddleware(validateParams.update()),
    controller(Role).update
);

module.exports = router;
