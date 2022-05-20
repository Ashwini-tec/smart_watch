const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/organizationSchema");
const Organization = require("../model/organization");
const { PERMS } = require("../../lib/bootstrap");
const authenticate = require("../../utils/auth");

/********** create ******** */
router.post(
    "/organization",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.CREATE_ORGANIZATION),
    validationMiddleware(validateParams.create()),
    controller(Organization).create
);

/********** get all  ******** */
router.get(
    "/organization",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ORGANIZATION),
    controller(Organization).getAll
);

/************ get by id ******** */
router.get(
    "/organization/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_ORGANIZATION),
    controller(Organization).getById
);

/************ update by id ******** */
router.put(
    "/organization/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.UPDATE_ORGANIZATION),
    validationMiddleware(validateParams.update()),
    controller(Organization).update
);

module.exports = router;
