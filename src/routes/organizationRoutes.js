const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/organizationSchema");
const Organization = require("../model/organization");

/********** create ******** */
router.post(
    "/organization",
    validationMiddleware(validateParams.create()),
    controller(Organization).create
);

/********** get all  ******** */
router.get(
    "/organization",
    controller(Organization).getAll
);

/************ get by id ******** */
router.get(
    "/organization/:id",
    controller(Organization).getById
);

/************ update by id ******** */
router.put(
    "/organization/:id",
    validationMiddleware(validateParams.update()),
    controller(Organization).update
);

module.exports = router;
