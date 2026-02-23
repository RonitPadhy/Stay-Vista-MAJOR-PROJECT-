const { required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = new Schema({});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", userSchema);

// username and password will automatically be added by the passport local mongoose
