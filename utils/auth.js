const jwt = require("jsonwebtoken");
const User = require("../src/model/user");
const { MESSAGE } = require("./constant");

/***************** authenticate with token *********************************/
const verifyUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers?.authorization?.split(" ");
        const token = bearerToken[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRETE_KEY

        );
        const userData = await User.findOne({ email: decoded.data.email });
        if (!userData) {
            return res.status(404).send({ status: 404, data: MESSAGE.DATA_NOT_FOUND });
        }
        res.local = decoded.data;
        next();

    } catch {
        res.status(401).send({ status: 401, data: MESSAGE.UN_AUTHENTICATED_USER });
    }
};


/***************** authenticate with user permission *********************************/
const permissionAuth = (permission) => async (req, res, next) => {
    try {
        const userPermission = res.local;
        const result = userPermission?.permissions.includes(permission);
        if (!result) {
            return res.status(404).send({ status: 404, data: MESSAGE.PERMISSION_NOT_PRESENT });
        }
        next();
    } catch {
        res.status(401).send({ status: 401, data: MESSAGE.UN_AUTHENTICATED_USER });
    }
};


module.exports = { verifyUser, permissionAuth };