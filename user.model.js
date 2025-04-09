const mongoose = require("mongoose");

///schema
const UserSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
}, {
    versionKey: false,
    timestamps: true
});
//model 
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;