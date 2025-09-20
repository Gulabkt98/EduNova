const mongoose = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log(" Database connected successfully"))
    .catch((err) => {
      console.error(" Database connection failed");
      console.error(err);
      process.exit(1);
    });
};

module.exports = { connectdb };
