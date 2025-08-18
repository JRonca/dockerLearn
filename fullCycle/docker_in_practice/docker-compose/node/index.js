const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/test`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

console.log(process.env.PORT);
