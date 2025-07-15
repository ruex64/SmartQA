const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  googleId: { type: String },
});

module.exports = mongoose.model("User", userSchema);
