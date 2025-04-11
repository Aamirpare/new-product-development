const mongoose = require("mongoose");
const UserModel = require("./user.validation.model");

class UserRepository {

    constructor(dbUrl) {
        mongoose.connect(dbUrl).then().catch(err => console.log(err));
    }

    async createUser(user) {
        return UserModel.create(user);
    }

    async deleteUsersByName(name) {
        return UserModel.deleteMany({ name: name });
    }

    async deleteUserById(id) {
        return UserModel.deleteOne({ _id: id });
    }

    async updateUser(id, user) {
        return UserModel.updateOne({ _id: id }, user);
    }

    async updateUsers(filter, user) {
        return UserModel.updateMany(filter, user);
    }

    async getUsers() {
        return UserModel.find();
    }

    async disconnect() {
        mongoose.disconnect();
    }
}

module.exports = UserRepository;
