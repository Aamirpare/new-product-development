const mongoose = require("mongoose");
const UserModel = require("./user.validation.model");


const dbUrl = "mongodb://127.0.0.1:27017/humandb";

mongoose.connect(dbUrl).then(x => console.log("Connected to mongodb!."));

const createUser = async (id) => {
    try {
        //=> Multiple ways of creating a user and saving to the database 
        // const userModel = UserModel({
        //     _id: id,
        //     name: "Aamir",
        //     age: 18,
        //     hobbies: ["reading", "writing", "watching movies"],
        //     address: {
        //         street: "G-11/4, 132",
        //         city: "Islamabad"
        //     }
        // });
        //userModel.save();

        const user = {
            _id: id,
            name: "Aamir",
            age: 18,
            hobbies: ["reading", "writing", "watching movies"],
            address: {
                street: "G-11/4, 132",
                city: "Islamabad"
            }
        }

        //=> Create user using save method 
        const result = await UserModel(user).save();

        //=>Create user using create method 
        //const result = await UserModel.create(user);
        console.log(result);

    } catch (error) {
        console.log(error);
    }
}

async function deleteUsersByName() {
    const result = await UserModel.deleteMany({ name: "Aamir" });
    console.log(result);
}

async function deleteUserById(id) {
    const result = await UserModel.findByIdAndDelete(id);
    console.log(result);
}

async function updateUser(id, newUser) {
    const result = await UserModel.updateOne({ _id: id }, newUser);
    console.log(result);
}

async function updateUsers(newUser) {
    const result = await UserModel.updateMany({ _id: { $lt: 4 } }, newUser);
    console.log(result);
}

async function findAll() {
    const result = await UserModel.find();
    console.log(result);
}

async function findUserByQueryMethods() {
    const result = await UserModel.where("_id").gt(0).lte(3).select(["name", "hobbies"]);
    console.log(result);
}

(async () => {
    //await createUser(8);
    //await deleteUserById(8);
    //await updateUser(8, { name: "Sameel", age: 12, hobbies: ["reading", "writing"] });
    //await updateUsers({ name: "Veronika", age: 22, hobbies: ["reading", "writing"] });
    //await findAll();

    console.log(await UserModel.where("_id").select(["name", "age"]));
    await mongoose.disconnect();
})();

