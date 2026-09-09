import axios from "axios";
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
})(Gender || (Gender = {}));
var USState;
(function (USState) {
    USState["MS"] = "Mississippi";
    USState["AL"] = "Alabama";
    USState["NV"] = "Nevada";
    USState["WI"] = "Wisconsin";
    USState["NH"] = "New Hampshire";
    USState["PA"] = "Pennsylvania";
})(USState || (USState = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["O_Negative"] = "O-";
    BloodGroup["B_Positive"] = "B+";
    BloodGroup["AB_Positive"] = "AB+";
})(BloodGroup || (BloodGroup = {}));
var EyeColor;
(function (EyeColor) {
    EyeColor["Green"] = "Green";
    EyeColor["Red"] = "Red";
    EyeColor["Hazel"] = "Hazel";
    EyeColor["Amber"] = "Amber";
})(EyeColor || (EyeColor = {}));
var Roles;
(function (Roles) {
    Roles["User"] = "user";
    Roles["Admin"] = "admin";
})(Roles || (Roles = {}));
const fetchCoffeeByIdApi = async ({ limit, skip, }) => {
    try {
        const { data } = await axios.get("https://dummyjson.com/users", {
            params: {
                limit: limit,
                skip: skip,
            },
        });
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            generateError(error.message);
        }
        generateError("Неизвестная ошибка при запросе");
    }
};
function generateError(message) {
    throw new Error(message);
}
const start = async () => {
    const data = await fetchCoffeeByIdApi({ limit: 10 });
    console.log(data);
};
start();
//# sourceMappingURL=dummy.js.map