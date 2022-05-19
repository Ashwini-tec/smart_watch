const router = require("express").Router();
require("dotenv").config();
// const controller = require("../controllers/CRUDController");
const userController = require("../controllers/userController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/userSchema");
const User = require("../model/user");
const authenticate = require("../../utils/auth");
const { PERMS } = require("../../lib/bootstrap");

/********** create ******** */
router.post(
    "/user",
    validationMiddleware(validateParams.create()),
    userController(User).create
);

/********** get all  ******** */
router.get(
    "/user",
    authenticate.verifyUser,
    authenticate.permissionAuth(PERMS.FETCH),
    userController(User).getAll
);
// seraph.middleware(perms.ROLE_WRITE),
/************ get by id ******** */
router.get(
    "/user/:id",
    userController(User).get
);

/************ update by id ******** */
router.put(
    "/user/:id",
    validationMiddleware(validateParams.update()),
    userController(User).update
);

/******************* forgot password ************ */
router.post(
    "/user/forgotPassword",
    validationMiddleware(validateParams.forgotPassword()),
    userController(User).forgotPassword
);

/***************** reset password ************ */
router.post(
    "/user/resetPassword/:uniqueId",
    validationMiddleware(validateParams.passwordUpdate()),
    userController(User).resetPassword
);

module.exports = router;
