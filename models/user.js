const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const plugin = passportLocalMongoose.default || passportLocalMongoose;

userSchema.plugin(plugin);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

// username and password will automatically be added by the passport local mongoose
