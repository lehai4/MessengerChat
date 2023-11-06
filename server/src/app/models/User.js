const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      require: true,
      max: 11,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    name: {
      type: String,
      require: true,
      max: 50,
    },
    avatar: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
