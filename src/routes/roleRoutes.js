const router = require("express").Router();
require("dotenv").config();
const controller = require("../controllers/CRUDController");
const validationMiddleware = require("../../config/schemaValidation");
const validateParams = require("../../middleware/roleSchema");
const Role = require("../model/role");

/********** create ******** */
router.post(
    "/role",
    validationMiddleware(validateParams.create()),
    controller(Role).create
);

/********** get all  ******** */
router.get(
    "/role",
    controller(Role).getAll
);

/************ get by id ******** */
router.get(
    "/role/:id",
    controller(Role).getById
);

/************ update by id ******** */
router.put(
    "/role/:id",
    validationMiddleware(validateParams.update()),
    controller(Role).update
);

module.exports = router;
