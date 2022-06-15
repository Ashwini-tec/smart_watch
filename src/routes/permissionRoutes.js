const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const Permission = require("../model/permission");
const { PERMS } = require("../../lib/bootstrap");
const authenticate = require("../../utils/auth");

/********** get all  ******** */
router.get(
    "/permission",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PERMISSION),
    controller(Permission).getAll
);

/************ get by id ******** */
router.get(
    "/permission/:id",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH_PERMISSION),
    controller(Permission).getById
);

module.exports = router;
