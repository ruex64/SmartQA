const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to User
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
