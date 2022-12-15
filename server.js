const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  dotenv.config({
    path: "./config.env",
  });
}
const app = require("./app");

const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 6000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
