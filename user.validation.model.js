const mongoose = require("mongoose");

///schema
const UserSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    age: {
        type: Number,
        min: 2,
        max: 65
    },
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