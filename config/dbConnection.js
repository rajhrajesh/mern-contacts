const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database connection established successfully:
            Host: ${connect.connection.host}
            Database Name: ${connect.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
