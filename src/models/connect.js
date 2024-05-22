const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.err(err);
    console.err("MongoDB Connection Error");
  }
}

module.exports = connect;
