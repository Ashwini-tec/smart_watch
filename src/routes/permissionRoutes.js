const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
// const validationMiddleware = require("../../config/schemaValidation");
// const validateParams = require("../../middleware/thresholdConstantSchema");
const Permission = require("../model/permission");
const { PERMS } = require("../../lib/bootstrap");
const authenticate = require("../../utils/auth");

/********** create ******** */
// router.post(
//     "/permission",
//     // validationMiddleware(validateParams.register()),
//     controller(Permission).create
// );

/********** get all  ******** */
router.get(
    "/permission",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH),
    controller(Permission).getAll
);

/************ get by id ******** */
router.get(
    "/permission/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH),
    controller(Permission).getById
);

// /************ update by id ******** */
// router.put(
//     "/permission/:id",
//     // validationMiddleware(validateParams.update()),
//     controller(Permission).update
// );

module.exports = router;
