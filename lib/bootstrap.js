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
        logo: "image",
        PCPNDTResistrationNumber: "",
        ARTRegistryNumber: "",
        LeadDoctorName:"",
        state: "",
        city: "",
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
    "CREATE_USER",
    "UPDATE_USER",
    "DELETE_USER",
    "FETCH_USER",
    "CREATE_ROLE",
    "UPDATE_ROLE",
    "DELETE_ROLE",
    "FETCH_ROLE",
    "CREATE_ORGANIZATION",
    "FETCH_ORGANIZATION",
    "DELETE_ORGANIZATION",
    "UPDATE_ORGANIZATION",
    "FETCH_PERMISSION",
    "CREATE_PROCEDURE",
    "FETCH_PROCEDURE",
    "UPDATE_PROCEDURE",
    "DELETE_PROCEDURE",
    "CREATE_THERMOMETER",
    "FETCH_THERMOMETER",
    "UPDATE_THERMOMETER",
    "CREATE_PATIENT",
    "FETCH_PATIENT",
    "UPDATE_PATIENT",
    "FETCH_ASSIGNE_PATIENT",
    "ASSIGNE_PATIENT",
    "UPDATE_ASSIGNE_PATIENT",
    "UPDATE_ASSIGNE_PATIENT_PROCEDURE",
    "CREATE_THRESHOLD",
    "FETCH_THRESHOLD",
    "UPDATE_THRESHOLD",
];

// Convert permissions to an object
const PERMS = {};
permission.forEach((perm) =>  PERMS[perm] = perm );


module.exports = { user, role, permission, organization, PERMS };
