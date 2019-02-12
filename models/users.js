const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { String: String, enum: ["advisor", "board", "member"] }
});

module.exports = User = mongoose.model("users", UserSchema);
