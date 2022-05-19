const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/loginController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/loginSchema");

/********** login ******** */
router.post(
    "/login",
    validationMiddleware(validateParams.login()),
    controller.login
);

module.exports = router;
