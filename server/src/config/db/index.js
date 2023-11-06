const mongoose = require("mongoose");
var mongoUrl = "mongodb://127.0.0.1:27017/server";
async function connect() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect server successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
module.exports = { connect };
