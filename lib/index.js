const { user, permission, role, organization } = require("./bootstrap");
const User = require("../src/model/user");
const Role = require("../src/model/role");
const Permission = require("../src/model/permission");
const Organization = require("../src/model/organization");
const bcrypt = require("bcrypt");

const bootstrapData = () => {
    try {
        console.log("Bootstraping Permission");
        permission.map( async(item) => {
            const result = await Permission.findOne({ name: item });
            if(!result){
                const data = {
                    name: item,
                };
                await Permission.create(data);
            }
        });
    } catch (error) {
        console.log("bootstrap error permission : ", error.message);
    }

    try {
        console.log("Bootstraping Role");
        role.map( async(item) => {
            const result = await Role.findOne({ name: item });
            if(!result){
                const data = {
                    name: item,
                };
                await Role.create(data);
            }
        });
    } catch (error) {
        console.log("bootstrap error role: ", error.message);
    }

    try {
        console.log("Bootstraping Organization");
        organization.map( async(item) => {
            const result = await Organization.findOne({ email: item.email });
            if(!result){
                await Organization.create(item);
            }
        });
    } catch (error) {
        console.log("bootstrap error organization : ", error.message);
    }

    try {
        console.log("Bootstraping User");
        const allPermission = [];
        user.map( async(item) => {
            const result = await User.findOne({ email: item.email });
            if(!result){
                const userRole = await Role.findOne({ name: item.role });
                await Promise.all( permission.map( async(i) => {
                    const infoPermission = await Permission.findOne({ name: i });
                    if(infoPermission){
                        allPermission.push({ name: infoPermission._id });
                    }
                }));
                const password = bcrypt.hashSync(item.password, 10);
                const data = {
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    password: password,
                    mobile: item.mobile,
                    address: item.address,
                    role: userRole._id,
                    permission: allPermission,
                };
                await User.create(data);
            }
        });
    } catch (error) {
        console.log("bootstrap error user : ", error.message);
    }
};

module.exports = bootstrapData;
