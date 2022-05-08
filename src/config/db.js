const mongoose = require("mongoose");

//connection to mongodb atlas
const connectDB = () => {
  try {
    const db="mongodb://localhost:27017/LDP";
    const conn = mongoose.connect(
      ` mongodb+srv://webghat:${process.env.DATABASE_PASSWORD}@webghat.5zifn.mongodb.net/LDP`,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Success");
  } catch (error) {
    console.log("Failed ", error);
  }
};

module.exports = connectDB;
