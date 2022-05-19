/********************* create super admin ********** */
const user = [
    {
        firstName: "Super",
        lastName: "Admin",
        mobile: "00000000000",
        email: "superuser@mailinator.com",
        role: "SUPER_ADMIN",
        address: "Mumbai",
        organization: "Default",
        password: "12345",
        permission: [],
    },
];

/************** default organization ******************* */
const organization = [
    {
        name: "Default",
        email: "org@mailinator.com",
        mobile: "00000000000",
        address: "Mumbai",
        image: "image",
        discription: "",
        bannerImage: "",
        isActive: true,
    }
];

/****************** create role ************ */
const role = [
    "SUPER_ADMIN",
    "ADMIN"
];


/****************** create permissions ********** */
const permission = [
    "CREATE",
    "UPDATE",
    "DELETE",
    "FETCH",
];

// Convert permissions to an object
const PERMS = {};
permission.forEach((perm) =>  PERMS[perm] = perm );


module.exports = { user, role, permission, organization, PERMS };
