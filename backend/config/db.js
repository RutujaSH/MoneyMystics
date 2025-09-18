const mongoose = require("mongoose");

// mongodb in server
// const { MongoMemoryServer} = require("mongodb-memory-server");

// const connectDB = async () => {
//   try {
//     const mongod = await MongoMemoryServer.create();
//     const uri = mongod.getUri();

//     await mongoose.connect(uri, {});
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.log("Error connecting to mongodb", err);
//     process.exit(1);
//   }
// };

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to mongodb", err);
    process.exit(1);
  }
};

module.exports = connectDB;
